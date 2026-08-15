import uuid
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.core.database import get_db, Workspace, DocumentSource
from app.services.rag_chain import process_and_store_pdf, generate_rag_response_stream

router = APIRouter()

class ChatRequest(BaseModel):
    workspace_id: str
    query: str

@router.post("/api/v1/workspaces/{workspace_id}/upload")
async def ingest_pdf(
    workspace_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Handles PDF file upload, text extraction, and vector embedding."""
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
        
    contents = await file.read()
    
    try:
        # FIX: Await the async pdf processing function
        chunks_created = await process_and_store_pdf(contents, file.filename, workspace_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process document: {str(e)}")
    
    doc_record = DocumentSource(
        id=str(uuid.uuid4()),
        workspace_id=workspace_id,
        filename=file.filename
    )
    db.add(doc_record)
    db.commit()
    
    return {
        "status": "success",
        "filename": file.filename,
        "chunks_indexed": chunks_created
    }




@router.post("/chat/stream")
async def chat_stream(payload: ChatRequest):
    """Streaming chat endpoint accepting raw JSON payload."""
    if not payload.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    return StreamingResponse(
        generate_rag_response_stream(payload.query, payload.workspace_id),
        media_type="text/event-stream",
    )


# Streaming Chat Query Endpoint (For Widget)
# @router.post("/chat/stream")
# async def chat_stream(
#     workspace_id: str = Form(...),
#     query: str = Form(...)
# ):
#     if not query.strip():
#         raise HTTPException(status_code=400, detail="Query cannot be empty.")

#     return StreamingResponse(
#         generate_rag_response_stream(query, workspace_id),
#         media_type="text/event-stream"
#     )




from datetime import datetime
from typing import List
from pydantic import BaseModel, ConfigDict


class DocumentSourceResponse(BaseModel):
    id: str
    filename: str
    chunk_count: int = 0
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class WorkspaceResponse(BaseModel):
    id: str
    name: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class WorkspaceDetailResponse(WorkspaceResponse):
    documents: List[DocumentSourceResponse] = []


class UploadDocumentResponse(BaseModel):
    id: str
    workspace_id: str
    filename: str
    chunk_count: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)







import uuid
from typing import List
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.core.database import get_db
# from app.documents.models import DocumentSource
# from app.workspaces.models import Workspace
# from app.workspaces.schemas import (
#     DocumentSourceResponse,
#     UploadDocumentResponse,
#     WorkspaceDetailResponse,
#     WorkspaceResponse,
# )

router = APIRouter(prefix="/workspaces", tags=["Workspaces"])


# 1. Matches getWorkspaces()
@router.get("", response_model=List[WorkspaceResponse])
@router.get("/", response_model=List[WorkspaceResponse])
def get_workspaces(db: Session = Depends(get_db)):
    """Retrieves all workspaces."""
    return db.query(Workspace).order_by(Workspace.created_at.desc()).all()


# 2. Matches getWorkspaceDetails(workspaceId)
@router.get("/{workspace_id}", response_model=WorkspaceDetailResponse)
def get_workspace_details(workspace_id: str, db: Session = Depends(get_db)):
    """Fetches a workspace along with its associated uploaded document sources."""
    workspace = (
        db.query(Workspace).filter(Workspace.id == workspace_id).first()
    )

    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")

    return workspace


# 3. Matches uploadDocument(workspaceId, file)
@router.post(
    "/{workspace_id}/upload",
    response_model=UploadDocumentResponse,
    status_code=201,
)
async def upload_document(
    workspace_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    """Uploads a PDF document to a workspace for processing and vector storage."""
    # Verify workspace existence
    workspace = (
        db.query(Workspace).filter(Workspace.id == workspace_id).first()
    )
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")

    # Validate file format
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400, detail="Only PDF files are supported."
        )

    contents = await file.read()

    try:
        # Process and vector-embed document text
        chunks_indexed = await process_and_store_pdf(
            contents, file.filename, workspace_id
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Failed to process document: {str(e)}"
        )

    # Persist metadata to database
    doc_record = DocumentSource(
        id=f"doc_{uuid.uuid4().hex[:8]}",
        workspace_id=workspace_id,
        filename=file.filename,
        chunk_count=chunks_indexed,
    )
    db.add(doc_record)
    db.commit()
    db.refresh(doc_record)

    return doc_record