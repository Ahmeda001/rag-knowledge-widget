s# backend/app/api/v1/endpoints.py
import uuid
from typing import List
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from fastapi.responses import StreamingResponse
from sqlmodel import Session, select

from app.core.database import (
    get_db, Workspace, DocumentSource, 
    WorkspaceRead, WorkspaceDetailRead, WorkspaceCreate, 
    DocumentSourceRead, ChatRequest
)
from app.services.rag_chain import process_and_store_pdf, generate_rag_response_stream

router = APIRouter(tags=["Workspaces & Chat"])


@router.post("/workspaces", response_model=WorkspaceRead, status_code=201)
def create_workspace(payload: WorkspaceCreate, db: Session = Depends(get_db)):
    """Creates a new workspace tenant."""
    clean_name = payload.name.strip()
    if not clean_name:
        raise HTTPException(status_code=400, detail="Workspace name cannot be empty.")

    ws_id = f"ws_{uuid.uuid4().hex[:8]}"
    workspace = Workspace(id=ws_id, name=clean_name)
    
    db.add(workspace)
    db.commit()
    db.refresh(workspace)
    
    return workspace


@router.get("/workspaces", response_model=List[WorkspaceRead])
def get_workspaces(db: Session = Depends(get_db)):
    """Retrieves all workspaces."""
    statement = select(Workspace).order_by(Workspace.created_at.desc())
    return db.exec(statement).all()


@router.get("/workspaces/{workspace_id}", response_model=WorkspaceDetailRead)
def get_workspace_details(workspace_id: str, db: Session = Depends(get_db)):
    """Fetches a workspace along with its associated uploaded document sources."""
    workspace = db.get(Workspace, workspace_id)
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")
    return workspace


@router.post("/workspaces/{workspace_id}/upload", response_model=DocumentSourceRead, status_code=201)
async def upload_document(
    workspace_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    """Uploads a PDF document to a workspace for processing and vector storage."""
    workspace = db.get(Workspace, workspace_id)
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    contents = await file.read()

    try:
        chunks_indexed = await process_and_store_pdf(contents, file.filename, workspace_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process document: {str(e)}")

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


@router.post("/chat/stream")
async def chat_stream(payload: ChatRequest):
    """Streaming chat endpoint accepting raw JSON payload."""
    if not payload.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    return StreamingResponse(
        generate_rag_response_stream(payload.query, payload.workspace_id),
        media_type="text/event-stream",
    )