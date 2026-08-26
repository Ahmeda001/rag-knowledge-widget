from fastapi import APIRouter
from app.api.v1.endpoints import workspaces, documents, chat

api_router = APIRouter()

# Register each sub-router with its appropriate prefix & tag
api_router.include_router(workspaces.router, prefix="/workspaces", tags=["Workspaces"])
api_router.include_router(documents.router, tags=["Documents"])
api_router.include_router(chat.router, prefix="/chat", tags=["Chat"])