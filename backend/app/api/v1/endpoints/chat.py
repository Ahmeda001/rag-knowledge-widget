from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import StreamingResponse

from app.core.auth import get_current_user_id
from app.core.schemas import ChatRequest
from app.services.rag_chain import generate_rag_response_stream

router = APIRouter()

# @router.post("/stream")
# async def chat_stream(
#     payload: ChatRequest,
#     # user_id: str = Depends(get_current_user_id)
# ):
#     """Streaming SSE endpoint for RAG chat queries."""
#     if not payload.query.strip():
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Query cannot be empty.")

#     return StreamingResponse(
#         generate_rag_response_stream(payload.query, payload.workspace_id),
#         media_type="text/event-stream",
#     )


@router.post("/stream")
async def chat_stream(
    payload: ChatRequest,
):
    """Streaming SSE endpoint for RAG chat queries."""
    if not payload.query.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Query cannot be empty."
        )

    return StreamingResponse(
        generate_rag_response_stream(payload.query, payload.workspace_id),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"  # Prevents Nginx/proxy buffering delays
        }
    )