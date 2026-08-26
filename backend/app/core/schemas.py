from typing import List
from sqlmodel import SQLModel
from .models import WorkspaceBase, DocumentSourceBase
from pydantic import BaseModel


class WorkspaceCreate(SQLModel):
    name: str


class ChatRequest(SQLModel):
    workspace_id: str
    query: str


class DocumentSourceRead(DocumentSourceBase):
    workspace_id: str


class UrlIngestRequest(BaseModel):
    url: str  # or HttpUrl

class WorkspaceRead(WorkspaceBase):
    pass


class WorkspaceDetailRead(WorkspaceBase):
    documents: List[DocumentSourceRead] = []