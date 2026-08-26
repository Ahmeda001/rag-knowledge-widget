import uuid
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

# Reuse your existing get_vector_store helper function
from app.services.rag_chain import get_vector_store

def process_and_store_url(url: str, workspace_id: str,doc_source_id: str = None) -> int:
    """Scrapes text from a URL, chunks it, and writes vectors to PGVector."""
    # 1. Fetch and parse web page text
    if not doc_source_id:
        doc_source_id = str(uuid.uuid4())


    loader = WebBaseLoader(url)
    raw_docs = loader.load()
    
    if not raw_docs or not raw_docs[0].page_content.strip():
        raise ValueError("Could not extract any readable text from the provided URL.")
        
    full_text = raw_docs[0].page_content
    
    # 2. Chunk text using the same strategy as PDFs
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
                "document_id": doc_source_id,
                "workspace_id": workspace_id,
                "chunk_id": str(uuid.uuid4())
            }
        )
        for chunk in chunks
    ]
    
    # 4. Save vectors to your workspace collection in PGVector
    vector_store = get_vector_store(workspace_id)
    vector_store.add_documents(documents)
    
    return len(documents)