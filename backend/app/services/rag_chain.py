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
from langchain_community.document_loaders import WebBaseLoader
from typing import AsyncGenerator
from fastapi.concurrency import run_in_threadpool
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_community.embeddings import FastEmbedEmbeddings
from functools import lru_cache
from langchain_postgres import PGVector
# Configured for OpenRouter API
DATABASE_URL = os.getenv("DATABASE_URL")


OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

# Models specified by user
CHAT_MODEL = "nvidia/nemotron-3.5-lightning:free"
# EMBEDDING_MODEL = "nvidia/nemotron-3-embed-1b:free"






# Local execution — 100% offline, zero API latency



# embeddings = HuggingFaceEndpointEmbeddings(
#     model="sentence-transformers/all-MiniLM-L6-v2",
#     huggingfacehub_api_token=os.getenv("HUGGINGFACEHUB_API_KEY")
# )

# Initialize OpenRouter Chat Model
llm = ChatOpenAI(
    model=CHAT_MODEL,
    temperature=0.2,
    openai_api_key=OPENROUTER_API_KEY,
    openai_api_base=OPENROUTER_BASE_URL
)


# def get_vector_store(workspace_id: str) -> PGVector:
#     """Creates/loads an isolated vector collection per workspace tenant."""
#     return PGVector(
#         embeddings=embeddings,
#         collection_name=f"workspace_{workspace_id}",
#         connection=DATABASE_URL,
#         use_jsonb=True
#     )



# 1. Instantiate the embedding model globally (reuse across all requests)
# embeddings = OpenAIEmbeddings(...)  # Keep your existing embeddings object here
embeddings = FastEmbedEmbeddings(model_name="BAAI/bge-small-en-v1.5")

@lru_cache(maxsize=128)
def get_vector_store(workspace_id: str) -> PGVector:
    """Creates/loads an isolated vector collection per workspace tenant (cached)."""
    return PGVector(
        embeddings=embeddings,
        collection_name=f"workspace_{workspace_id}",
        connection=DATABASE_URL,
        use_jsonb=True
    )


async def process_and_store_pdf(file_bytes: bytes, filename: str, workspace_id: str,doc_id: str ) -> int:
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
            metadata={"source": filename, "workspace_id": workspace_id,  "document_id": doc_id, "chunk_id": str(uuid.uuid4())}
        )
        for chunk in chunks
    ]
    
    vector_store = get_vector_store(workspace_id)
    
    # FIX: Make this an async function and await the document insertion
    vector_store.add_documents(documents)
    
    return len(documents)


async def process_and_store_url(url: str, workspace_id: str, doc_id: str) -> int:
    """Scrapes text from a web link, chunks it, and writes vectors to PGVector."""
    # 1. Scrape text from URL
    loader = WebBaseLoader(url)
    raw_docs = loader.load()
    
    if not raw_docs or not raw_docs[0].page_content.strip():
        raise ValueError("Could not extract any text from the provided URL.")
        
    full_text = raw_docs[0].page_content
    
    # 2. Chunk text using standard strategy
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=600,
        chunk_overlap=100
    )
    chunks = text_splitter.split_text(full_text)
    
    # 3. Create Document Objects with Metadata
    documents = [
        Document(
            page_content=chunk,
            metadata={
                "source": url,
                "workspace_id": workspace_id,
                "document_id": doc_id,
                "chunk_id": str(uuid.uuid4())
            }
        )
        for chunk in chunks
    ]
    
    # 4. Store vectors in PGVector
    vector_store = get_vector_store(workspace_id)
    vector_store.add_documents(documents)
    
    return len(documents)


# async def generate_rag_response_stream(query: str, workspace_id: str) -> AsyncGenerator[str, None]:
#     """Retrieves context from PGVector and streams tokens from OpenRouter."""
#     vector_store = get_vector_store(workspace_id)
    
#     # Offload sync similarity_search to thread pool to avoid blocking ASGI loop
#     relevant_docs = await run_in_threadpool(
#         vector_store.similarity_search, 
#         query, 
#         k=3
#     )
    
#     context = "\n\n".join([doc.page_content for doc in relevant_docs])
    
#     # Prompt Template
#     prompt_template = ChatPromptTemplate.from_template("""
#     You are friendly, concise, and helpful AI Support Assistant. 
#     Answer the user's question using ONLY the provided context below.

#     Formatting Guidelines:
#     - Write in a warm, clean, and professional tone.
#     - Do NOT start responses with meta-intros like "Based on the context provided...". Answer directly.
#     - Use **bold text** to highlight key terms, metrics, or feature names.
#     - Break down lists of features, steps, or features into crisp **bullet points**.
#     - Keep paragraphs short (1–2 sentences maximum).
#     - If the context does not contain enough information to answer the question, state: "I don't have that specific information in my context right now. Please reach out to  support for further assistance."

#     Context:
#     {context}

#     User Question:
#     {question}

#     Answer:
#     """)
    
#     chain = prompt_template | llm | StrOutputParser()
    
#     # Stream tokens asynchronously
#     async for chunk in chain.astream({"context": context, "question": query}):
#         yield chunk


import json
from typing import AsyncGenerator
from fastapi.concurrency import run_in_threadpool
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser




import asyncio
import json
from typing import AsyncGenerator
from fastapi.concurrency import run_in_threadpool
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# In-memory store for instant cache hits on repeated queries
RESPONSE_CACHE = {}

async def generate_rag_response_stream(query: str, workspace_id: str) -> AsyncGenerator[str, None]:
    """Retrieves context from PGVector and streams SSE events containing sources and tokens."""
    
    cache_key = (workspace_id, query.strip().lower())

    # FAST PATH: Instant cached return for duplicate queries
    if cache_key in RESPONSE_CACHE:
        cached_data = RESPONSE_CACHE[cache_key]
        
        # 1. Yield cached sources
        yield f"data: {json.dumps({'type': 'sources', 'data': cached_data['sources']})}\n\n"
        await asyncio.sleep(0)
        
        # 2. Yield full text
        yield f"data: {json.dumps({'type': 'text', 'data': cached_data['text']})}\n\n"
        await asyncio.sleep(0)
        return

    # SLOW PATH: Vector Retrieval + LLM Execution
    vector_store = get_vector_store(workspace_id)
    
    # 1. Retrieve context chunks
    relevant_docs = await run_in_threadpool(
        vector_store.similarity_search, 
        query, 
        k=3
    )
    
    # 2. Extract unique sources metadata
    sources = []
    seen = set()
    for doc in relevant_docs:
        filename = doc.metadata.get("source", "Document")
        page = doc.metadata.get("page", None)
        
        label = f"{filename}" + (f" · page {page}" if page else "")
        if label not in seen:
            seen.add(label)
            sources.append({"label": label})

    # 3. First Event: Stream sources metadata & flush loop
    yield f"data: {json.dumps({'type': 'sources', 'data': sources})}\n\n"
    await asyncio.sleep(0)
    
    context = "\n\n".join([doc.page_content for doc in relevant_docs])
    
    # 4. Prompt Template
    prompt_template = ChatPromptTemplate.from_template("""
    You are friendly, concise, and helpful AI Support Assistant. 
    Answer the user's question using ONLY the provided context below.

    Formatting Guidelines:
    - Write in a warm, clean, and professional tone.
    - Do NOT start responses with meta-intros like "Based on the context provided...". Answer directly.
    - Use **bold text** to highlight key terms, metrics, or feature names.
    - Break down lists of features, steps, or features into crisp **bullet points**.
    - Keep paragraphs short (1–2 sentences maximum).
    - If the context does not contain enough information to answer the question, state: "I don't have that specific information in my context right now. Please reach out to support for further assistance."
    - If the answer is not explicitly supported by the provided context, do not guess or infer information.

    Context:
    {context}

    User Question:
    {question}

    Answer:
    """)
    
    chain = prompt_template | llm | StrOutputParser()
    
    full_generated_text = ""

    # 5. Subsequent Events: Stream text tokens instantly
    async for chunk in chain.astream({"context": context, "question": query}):
        if chunk:
            full_generated_text += chunk
            yield f"data: {json.dumps({'type': 'text', 'data': chunk})}\n\n"
            await asyncio.sleep(0)  # Immediately flushes socket

    # Save to memory cache for zero-latency subsequent calls
    if full_generated_text:
        RESPONSE_CACHE[cache_key] = {
            "text": full_generated_text,
            "sources": sources
        }

# async def generate_rag_response_stream(query: str, workspace_id: str) -> AsyncGenerator[str, None]:
#     """Retrieves context from PGVector and streams SSE events containing sources and tokens."""
#     vector_store = get_vector_store(workspace_id)
    
#     # 1. Retrieve context chunks
#     relevant_docs = await run_in_threadpool(
#         vector_store.similarity_search, 
#         query, 
#         k=3
#     )
    
#     # 2. Extract unique sources metadata
#     sources = []
#     seen = set()
#     for doc in relevant_docs:
#         filename = doc.metadata.get("source", "Document")
#         page = doc.metadata.get("page", None)
        
#         label = f"{filename}" + (f" · page {page}" if page else "")
#         if label not in seen:
#             seen.add(label)
#             sources.append({"label": label})

#     # 3. First Event: Stream sources metadata
#     yield f"data: {json.dumps({'type': 'sources', 'data': sources})}\n\n"
    
#     context = "\n\n".join([doc.page_content for doc in relevant_docs])
    
#     # 4. Prompt Template
#     prompt_template = ChatPromptTemplate.from_template("""
#     You are friendly, concise, and helpful AI Support Assistant. 
#     Answer the user's question using ONLY the provided context below.

#     Formatting Guidelines:
#     - Write in a warm, clean, and professional tone.
#     - Do NOT start responses with meta-intros like "Based on the context provided...". Answer directly.
#     - Use **bold text** to highlight key terms, metrics, or feature names.
#     - Break down lists of features, steps, or features into crisp **bullet points**.
#     - Keep paragraphs short (1–2 sentences maximum).
#     - If the context does not contain enough information to answer the question, state: "I don't have that specific information in my context right now. Please reach out to support for further assistance."

#     Context:
#     {context}

#     User Question:
#     {question}

#     Answer:
#     """)
    
#     chain = prompt_template | llm | StrOutputParser()
    
#     # 5. Subsequent Events: Stream text tokens
#     async for chunk in chain.astream({"context": context, "question": query}):
#         if chunk:
#             yield f"data: {json.dumps({'type': 'text', 'data': chunk})}\n\n"



# Add to backend/app/services/rag_chain.py


