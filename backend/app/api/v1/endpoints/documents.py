import uuid
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status,Form
from sqlmodel import Session, select


# from fastapi import APIRouter, HTTPException, , Depends
# from sqlalchemy.orm import Session
# from app.services.rag_chain import process_and_store_url
from app.core.auth import get_current_user_id
from app.core.database import get_db
from app.core.schemas import DocumentSourceRead
from app.core.models import Workspace, DocumentSource
from fastapi import APIRouter, Depends, HTTPException, status,Path
from sqlmodel import Session, text
# from database import get_db
# from models import DocumentSource

from app.services.rag_chain import process_and_store_pdf, process_and_store_url


router = APIRouter()

@router.post("/workspaces/{workspace_id}/upload", response_model=DocumentSourceRead, status_code=status.HTTP_201_CREATED)
async def upload_document(
    workspace_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id)
):
    """Uploads and embeds a PDF document for a workspace."""
    user_uuid = uuid.UUID(user_id)
    workspace = db.exec(
        select(Workspace).where(Workspace.id == workspace_id, Workspace.user_id == user_uuid)
    ).first()
    
    if not workspace:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Workspace not found.")

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Only PDF files are supported.")

    contents = await file.read()
    doc_id = f"doc_{uuid.uuid4().hex[:8]}"

    try:
        chunks_indexed = await process_and_store_pdf(contents, file.filename, workspace_id, doc_id)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to process document: {str(e)}")

    doc_record = DocumentSource(
        id=doc_id,
        workspace_id=workspace_id,
        filename=file.filename,
        chunk_count=chunks_indexed,
    )
    db.add(doc_record)
    db.commit()
    db.refresh(doc_record)

    return doc_record


@router.post("/workspaces/{workspace_id}/url")
async def ingest_url(
    workspace_id: str = Path(..., description="The ID of the workspace"),
    url: str = Form(...),
    db: Session = Depends(get_db)
):
    if not url.startswith(("http://", "https://")):
        raise HTTPException(status_code=400, detail="Invalid URL protocol. Must start with http:// or https://")

    doc_id = f"doc_{uuid.uuid4().hex[:8]}"
    try:
        chunks_created = await process_and_store_url(url, workspace_id, doc_id)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Failed to process document: {str(e)}")
        
        # Save record in SQL database alongside your PDF documents
    doc_record = DocumentSource(
            id=doc_id,
            workspace_id=workspace_id,
            filename=url,  # Store URL in place of filename
            chunks_count=chunks_created,
        )
    db.add(doc_record)
    db.commit()
    db.refresh(doc_record)
        
    return doc_record


@router.delete("/workspaces/{workspace_id}/documents/{document_id}", status_code=status.HTTP_200_OK)
async def delete_document(
    workspace_id: str,
    document_id: str,
    db: Session = Depends(get_db)
):
    """
    Deletes a document source and purges all of its associated vector embeddings/chunks.
    """
    # 1. Verify that the document exists and belongs to the workspace
    doc = db.query(DocumentSource).filter(
        DocumentSource.id == document_id,
        DocumentSource.workspace_id == workspace_id
    ).first()

    if not doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found in this workspace"
        )

    # 2. Delete vector embeddings from PGVector using JSON metadata matching
    # (Safe backup even if foreign key cascade is not configured in SQL)
    try:
        # 2. Delete vector embeddings directly using the document_id inside cmetadata
        delete_embeddings_query = text("""
            DELETE FROM langchain_pg_embedding 
            WHERE cmetadata::jsonb->>'document_id' = :document_id
        """)
        
        result = db.execute(delete_embeddings_query, {"document_id": document_id})
        deleted_count = result.rowcount

        # 3. Delete the document record from DB
        db.delete(doc)
        db.commit()

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to delete document and embeddings: {str(e)}"
        )   

    return {
        "status": "success",
        "message": f"Document '{doc.filename}' and all associated vector chunks deleted successfully."
    }