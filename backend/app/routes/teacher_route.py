from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schema.teacher_schema import TeacherCreate, TeacherUpdate, TeacherResponse
from app.service.teacher_service import *

router = APIRouter(prefix="/teacher", tags=["Teacher"])

@router.post("/", response_model=TeacherResponse)
def create(teacher: TeacherCreate, db: Session = Depends(get_db)):
    return create_teacher(db, teacher)

@router.get("/", response_model=list[TeacherResponse])
def get_all(db: Session = Depends(get_db)):
    return get_all_teachers(db)

@router.get("/{teacher_id}", response_model=TeacherResponse)
def get_one(teacher_id: int, db: Session = Depends(get_db)):
    teacher = get_teacher_by_id(db, teacher_id)
    if not teacher:
        raise HTTPException(404, "Teacher not found")
    return teacher

@router.put("/{teacher_id}", response_model=TeacherResponse)
def update(teacher_id: int, teacher: TeacherUpdate, db: Session = Depends(get_db)):
    updated = update_teacher(db, teacher_id, teacher)
    if not updated:
        raise HTTPException(404, "Teacher not found")
    return updated

@router.delete("/{teacher_id}")
def delete(teacher_id: int, db: Session = Depends(get_db)):
    if not delete_teacher(db, teacher_id):
        raise HTTPException(404, "Teacher not found")
    return {"message": "Teacher deleted"}
