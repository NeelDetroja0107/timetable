from fastapi import FastAPI

from app.routes.classroom_route import router as classroom_router
from app.routes.branch_route import router as branch_router
from app.routes.teacher_route import router as teacher_router
from app.routes.subject_route import router as subject_router
from app.routes.division_route import router as division_router

app = FastAPI()

app.include_router(classroom_router)
app.include_router(branch_router)
app.include_router(teacher_router)
app.include_router(subject_router)
app.include_router(division_router)
