# backend/app/core/database.py
import os
from datetime import datetime
from typing import List, Optional
from dotenv import load_dotenv
from sqlmodel import Field, Relationship, Session, SQLModel, create_engine

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")
engine = create_engine(DATABASE_URL, echo=True)

# --- Base Models (Shared Fields) ---

class DocumentSourceBase(SQLModel):
    id: str = Field(primary_key=True)
    filename: str
    chunk_count: int = Field(default=0)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class WorkspaceBase(SQLModel):
    id: str = Field(primary_key=True)
    name: str
    created_at: datetime = Field(default_factory=datetime.utcnow)


# --- Table Models (Database Entities) ---

class Workspace(WorkspaceBase, table=True):
    __tablename__ = "workspaces"

    documents: List["DocumentSource"] = Relationship(
        back_populates="workspace",
        sa_relationship_kwargs={"cascade": "all, delete-orphan"},
    )

class DocumentSource(DocumentSourceBase, table=True):
    __tablename__ = "document_sources"

    workspace_id: str = Field(
        foreign_key="workspaces.id",
        ondelete="CASCADE",
        nullable=False,
    )
    workspace: Optional[Workspace] = Relationship(back_populates="documents")


# --- API Request & Response Schemas ---

class WorkspaceCreate(SQLModel):
    name: str

class ChatRequest(SQLModel):
    workspace_id: str
    query: str

class DocumentSourceRead(DocumentSourceBase):
    workspace_id: str

class WorkspaceRead(WorkspaceBase):
    pass

class WorkspaceDetailRead(WorkspaceBase):
    documents: List[DocumentSourceRead] = []


# --- Database Helpers ---

def init_db():
    SQLModel.metadata.create_all(engine)

def get_db():
    with Session(engine) as session:
        yield session