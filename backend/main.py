# backend/main.py
import uuid
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from pathlib import Path
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.api.v1.endpoints import router as api_router
from app.core.database import init_db, get_db, Workspace, DocumentSource
from app.services.rag_chain import process_and_store_pdf, generate_rag_response_stream


app = FastAPI(title="Local RAG Knowledge Widget API", version="1.0.0")


class WorkspaceCreate(BaseModel):
    name: str


# Allow Frontend & Client Sites to make cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent
app.mount("/static", StaticFiles(directory=BASE_DIR / "static"), name="static")

@app.on_event("startup")
def on_startup():
    init_db()

# Mount API V1 Router


@app.get("/")
def health_check():
    return {"status": "online", "system": "RAG Engine Active"}



@app.post("/api/v1/workspaces")
def create_workspace(
    payload: WorkspaceCreate, 
    db: Session = Depends(get_db)
):
    """Creates a new workspace tenant using a raw JSON payload."""
    # Ensure workspace name isn't just empty whitespace
    clean_name = payload.name.strip()
    if not clean_name:
        raise HTTPException(status_code=400, detail="Workspace name cannot be empty.")

    ws_id = f"ws_{uuid.uuid4().hex[:8]}"
    workspace = Workspace(id=ws_id, name=clean_name)
    
    db.add(workspace)
    db.commit()
    db.refresh(workspace)
    
    return {"workspace_id": workspace.id, "name": workspace.name}


@app.post("/api/v1/ingest/pdf")
async def ingest_pdf(
    workspace_id: str = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """Handles PDF file upload, text extraction, and vector embedding."""
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
        
    contents = await file.read()
    chunks_created = await process_and_store_pdf(contents, file.filename, workspace_id)
    
    # Save Metadata to SQL
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

@app.get("/api/v1/chat")
async def chat(workspace_id: str, query: str):
    """Streaming API Endpoint for chatbot responses."""
    if not query or not workspace_id:
        raise HTTPException(status_code=400, detail="Missing required query or workspace_id parameter.")
        
    return StreamingResponse(
        generate_rag_response_stream(query, workspace_id),
        media_type="text/event-stream"
    )



app.include_router(api_router, prefix="/api/v1")