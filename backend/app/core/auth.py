# auth.py
import os
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from supabase import create_client, Client

security = HTTPBearer()

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://dhkpvximacqyhmqbsdzd.supabase.co")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY", "sb_publishable_o0ENmPaorzK6veisbVno0A_24nnHh4C")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

async def get_current_user_id(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """Extracts the Bearer token, asks Supabase Auth for the user object,

    and returns the user's UUID string.
    """
    token = credentials.credentials

    try:
        # Validate token with Supabase Auth
        response = supabase.auth.get_user(token)
        
        if not response or not response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Invalid or expired token"
            )

        # Returns the UUID string (e.g. "a1b2c3d4-...")
        return response.user.id 

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )