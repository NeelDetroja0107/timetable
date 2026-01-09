from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from app.routes.classroom_route import router as classroom_router
from app.routes.teacher_route import router as teacher_router
from app.routes.branch_route import router as branch_router
from app.routes.subject_route import router as subject_router

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
app.include_router(teacher_router)
app.include_router(branch_router)
app.include_router(subject_router)

@app.get("/")
def root():
    return {"message": "Backend is running"}