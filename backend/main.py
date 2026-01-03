from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from app.routes.classroom_route import router as classroom_router

load_dotenv()

app = FastAPI()

# ✅ CORS configuration - must be BEFORE routes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Temporarily allow all origins for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Include routers
app.include_router(classroom_router)


@app.get("/")
def root():
    return {"message": "Backend is running"}