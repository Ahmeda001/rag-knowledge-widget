# backend/run.py
import sys
import os
import uvicorn

# 1. Get the absolute path to the directory containing this file (backend/)
current_dir = os.path.dirname(os.path.abspath(__file__))

# 2. Insert it at the top of Python's search paths
sys.path.insert(0, current_dir)

if __name__ == "__main__":
    # 3. Launch Uvicorn server programmatically
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
    