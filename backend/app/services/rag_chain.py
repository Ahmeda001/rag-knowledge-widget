# backend/app/services/rag_chain.py
import io
import uuid
import os
from typing import AsyncGenerator
from pypdf import PdfReader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_postgres import PGVector
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from langchain_huggingface import HuggingFaceEndpointEmbeddings
from langchain_core.output_parsers import StrOutputParser

from typing import AsyncGenerator
from fastapi.concurrency import run_in_threadpool
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser


# Configured for OpenRouter API
DATABASE_URL = os.getenv("DATABASE_URL")


OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

# Models specified by user
CHAT_MODEL = "nvidia/nemotron-3.5-lightning:free"
# EMBEDDING_MODEL = "nvidia/nemotron-3-embed-1b:free"



embeddings = HuggingFaceEndpointEmbeddings(
    model="sentence-transformers/all-MiniLM-L6-v2",
    huggingfacehub_api_token=os.getenv("HUGGINGFACEHUB_API_KEY")
)

# Initialize OpenRouter Chat Model
llm = ChatOpenAI(
    model=CHAT_MODEL,
    temperature=0.2,
    openai_api_key=OPENROUTER_API_KEY,
    openai_api_base=OPENROUTER_BASE_URL
)

def get_vector_store(workspace_id: str) -> PGVector:
    """Creates/loads an isolated vector collection per workspace tenant."""
    return PGVector(
        embeddings=embeddings,
        collection_name=f"workspace_{workspace_id}",
        connection=DATABASE_URL,
        use_jsonb=True
    )



async def process_and_store_pdf(file_bytes: bytes, filename: str, workspace_id: str) -> int:
    """Extracts text from PDF, chunks it, and writes vectors to PGVector."""
    pdf_file = io.BytesIO(file_bytes)
    reader = PdfReader(pdf_file)
    
    full_text = ""
    for page in reader.pages:
        text = page.extract_text()
        if text:
            full_text += text + "\n"
            
    if not full_text.strip():
        raise ValueError("PDF contains no extractable text.")
            
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=600,
        chunk_overlap=100
    )
    chunks = text_splitter.split_text(full_text)
    
    documents = [
        Document(
            page_content=chunk,
            metadata={"source": filename, "workspace_id": workspace_id, "chunk_id": str(uuid.uuid4())}
        )
        for chunk in chunks
    ]
    
    vector_store = get_vector_store(workspace_id)
    
    # FIX: Make this an async function and await the document insertion
    vector_store.add_documents(documents)
    
    return len(documents)


async def generate_rag_response_stream(query: str, workspace_id: str) -> AsyncGenerator[str, None]:
    """Retrieves context from PGVector and streams tokens from OpenRouter."""
    vector_store = get_vector_store(workspace_id)
    
    # Offload sync similarity_search to thread pool to avoid blocking ASGI loop
    relevant_docs = await run_in_threadpool(
        vector_store.similarity_search, 
        query, 
        k=3
    )
    
    context = "\n\n".join([doc.page_content for doc in relevant_docs])
    
    # Prompt Template
    prompt_template = ChatPromptTemplate.from_template("""
    You are a helpful customer support assistant. Answer the user's question accurately using ONLY the context provided below. 
    If you do not know the answer based on the context, politely inform them that you do not have that information.

    Context:
    {context}

    User Question:
    {question}

    Answer:
    """)
    
    chain = prompt_template | llm | StrOutputParser()
    
    # Stream tokens asynchronously
    async for chunk in chain.astream({"context": context, "question": query}):
        yield chunk
