# backend/main.py
from contextlib import asynccontextmanager
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.v1.endpoints import router as api_router
from app.core.database import init_db

# Modern FastAPI lifespan manager replaces @app.on_event("startup")
@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield

app = FastAPI(
    title="Local RAG Knowledge Widget API", 
    version="1.0.0",
    lifespan=lifespan
)

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

@app.get("/")
def health_check():
    return {"status": "online", "system": "RAG Engine Active"}

# Mount API V1 Router
app.include_router(api_router, prefix="/api/v1")