from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schema.subject_schema import SubjectCreate, SubjectUpdate, SubjectResponse
from app.service.subject_service import *

router = APIRouter(prefix="/subject", tags=["Subject"])

@router.post("/", response_model=SubjectResponse)
def create(subject: SubjectCreate, db: Session = Depends(get_db)):
    return create_subject(db, subject)

@router.get("/", response_model=list[SubjectResponse])
def get_all(db: Session = Depends(get_db)):
    return get_all_subjects(db)

@router.get("/{subject_id}", response_model=SubjectResponse)
def get_one(subject_id: int, db: Session = Depends(get_db)):
    subject = get_subject_by_id(db, subject_id)
    if not subject:
        raise HTTPException(404, "Subject not found")
    return subject

@router.put("/{subject_id}", response_model=SubjectResponse)
def update(subject_id: int, subject: SubjectUpdate, db: Session = Depends(get_db)):
    updated = update_subject(db, subject_id, subject)
    if not updated:
        raise HTTPException(404, "Subject not found")
    return updated

@router.delete("/{subject_id}")
def delete(subject_id: int, db: Session = Depends(get_db)):
    if not delete_subject(db, subject_id):
        raise HTTPException(404, "Subject not found")
    return {"message": "Subject deleted"}
