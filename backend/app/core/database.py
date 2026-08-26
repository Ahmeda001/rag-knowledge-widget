# # backend/app/core/database.py
# import os
# import uuid
# from datetime import datetime
# from typing import List, Optional
# from dotenv import load_dotenv
# from sqlalchemy.dialects.postgresql import UUID
# from sqlmodel import Column,Field, Relationship, Session, SQLModel, create_engine

# load_dotenv()

# DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")
# engine = create_engine(DATABASE_URL, echo=True)

# # --- Base Models (Shared Fields) ---

# class DocumentSourceBase(SQLModel):
#     id: str = Field(primary_key=True)
#     filename: str
#     chunk_count: int = Field(default=0)
#     created_at: datetime = Field(default_factory=datetime.utcnow)

# class WorkspaceBase(SQLModel):
#     id: str = Field(primary_key=True)
#     name: str
#     user_id: uuid.UUID = Field(nullable=False)
#     created_at: datetime = Field(default_factory=datetime.utcnow)


# # --- Table Models (Database Entities) ---

# class Workspace(WorkspaceBase, table=True):
#     __tablename__ = "workspaces"

#     documents: List["DocumentSource"] = Relationship(
#         back_populates="workspace",
#         sa_relationship_kwargs={"cascade": "all, delete-orphan"},
#     )

# class DocumentSource(DocumentSourceBase, table=True):
#     __tablename__ = "document_sources"

#     workspace_id: str = Field(
#         foreign_key="workspaces.id",
#         ondelete="CASCADE",
#         nullable=False,
#     )
#     workspace: Optional[Workspace] = Relationship(back_populates="documents")


# # --- API Request & Response Schemas ---

# class WorkspaceCreate(SQLModel):
#     name: str

# class ChatRequest(SQLModel):
#     workspace_id: str
#     query: str

# class DocumentSourceRead(DocumentSourceBase):
#     workspace_id: str

# class WorkspaceRead(WorkspaceBase):
#     pass

# class WorkspaceDetailRead(WorkspaceBase):
#     documents: List[DocumentSourceRead] = []


# # --- Database Helpers ---

# def init_db():
#     SQLModel.metadata.create_all(engine)

# def get_db():
#     with Session(engine) as session:
#         yield session




# import os
# from dotenv import load_dotenv
# from sqlmodel import Session, SQLModel, create_engine

# load_dotenv()

# DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")

# engine = create_engine(
#     DATABASE_URL, 
#     echo=False, 
#     pool_pre_ping=True, 
#     pool_recycle=300
# )


# def init_db():
#     """Initializes schema tables in the database."""
#     SQLModel.metadata.create_all(engine)


# def get_db():
#     """Yields database session per request."""
#     with Session(engine) as session:
#         yield session



import os
from dotenv import load_dotenv
from sqlmodel import Session, SQLModel, create_engine, text

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./app.db")

engine = create_engine(
    DATABASE_URL, 
    echo=False, 
    pool_pre_ping=True, 
    pool_recycle=300
)


def init_db():
    """Initializes schema tables and PGVector HNSW indexing safely."""
    SQLModel.metadata.create_all(engine)
    
    if engine.url.drivername.startswith("postgresql"):
        with engine.begin() as conn:
            conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector;"))
            try:
                # 1. Cast column to vector(384) required for BAAI/bge-small-en-v1.5
                conn.execute(text("""
                    ALTER TABLE langchain_pg_embedding 
                    ALTER COLUMN embedding TYPE vector(384);
                """))

                # 2. Create the HNSW Index
                conn.execute(text("""
                    CREATE INDEX IF NOT EXISTS idx_embeddings_hnsw 
                    ON langchain_pg_embedding 
                    USING hnsw (embedding vector_cosine_ops)
                    WITH (m = 16, ef_construction = 64);
                """))
            except Exception:
                # Ignored if table doesn't exist yet; applies once documents are inserted
                pass

def get_db():
    """Yields database session per request."""
    with Session(engine) as session:
        yield session