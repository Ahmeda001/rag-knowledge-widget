import uuid
from datetime import datetime, timezone
from typing import List, Optional
from sqlmodel import Field, Relationship, SQLModel


class WorkspaceBase(SQLModel):
    id: str = Field(primary_key=True)
    name: str
    user_id: uuid.UUID = Field(nullable=False, index=True)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )


class DocumentSourceBase(SQLModel):
    id: str = Field(primary_key=True)
    filename: str
    chunk_count: int = Field(default=0)
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )


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