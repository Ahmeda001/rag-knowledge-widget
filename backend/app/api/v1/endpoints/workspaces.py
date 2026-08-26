import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from sqlalchemy import text

from app.core.auth import get_current_user_id
from app.core.database import get_db
from app.core.schemas import WorkspaceRead,WorkspaceDetailRead, WorkspaceCreate
from app.core.models import Workspace

router = APIRouter()

@router.post("", response_model=WorkspaceRead, status_code=status.HTTP_201_CREATED)
def create_workspace(
    payload: WorkspaceCreate,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id)
):
    """Creates a new workspace linked to the authenticated user."""
    clean_name = payload.name.strip()
    if not clean_name:
        raise HTTPException(status_code=400, detail="Workspace name cannot be empty.")

    workspace = Workspace(
        id=f"ws_{uuid.uuid4().hex[:8]}",
        name=clean_name,
        user_id=user_id
    )
    db.add(workspace)
    db.commit()
    db.refresh(workspace)
    return workspace


@router.get("", response_model=list[WorkspaceRead])
def get_workspaces(
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id)
):
    """Retrieves all workspaces created by the logged-in user."""
    user_uuid = uuid.UUID(user_id)
    statement = select(Workspace).where(Workspace.user_id == user_uuid)
    return db.exec(statement).all()


@router.get("/{workspace_id}", response_model=WorkspaceDetailRead)
def get_workspace_details(
    workspace_id: str,
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id)
):
    """Fetches a workspace along with its attached documents."""
    user_uuid = uuid.UUID(user_id)
    statement = select(Workspace).where(
        Workspace.id == workspace_id,
        Workspace.user_id == user_uuid
    )
    workspace = db.exec(statement).first()

    if not workspace:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Workspace not found.")

    return workspace


@router.delete("/{workspace_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_workspace(
    workspace_id: str, 
    db: Session = Depends(get_db),
    user_id: str = Depends(get_current_user_id)
):
    """Deletes a workspace tenant, its SQL records, and vector embeddings."""
    user_uuid = uuid.UUID(user_id)
    workspace = db.exec(
        select(Workspace).where(Workspace.id == workspace_id, Workspace.user_id == user_uuid)
    ).first()

    if not workspace:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Workspace not found.")

    # Cascades vector embeddings for the workspace collection
    query = text("DELETE FROM langchain_pg_collection WHERE name = :coll_name;")
    db.execute(query, {"coll_name": f"workspace_{workspace_id}"})

    db.delete(workspace)
    db.commit()
    return None