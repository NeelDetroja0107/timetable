from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schema.classroom_schema import (
    ClassroomCreate,
    ClassroomUpdate,
    ClassroomResponse
)
from app.service.classroom_service import (
    create_classroom,
    get_all_classrooms,
    get_classroom_by_id,
    update_classroom,
    delete_classroom
)

router = APIRouter(prefix="/classroom", tags=["Classroom"])


# CREATE
@router.post("/", response_model=ClassroomResponse)
def add_classroom(
    classroom: ClassroomCreate,
    db: Session = Depends(get_db)
):
    return create_classroom(db, classroom)


# GET ALL
@router.get("/", response_model=list[ClassroomResponse])
def list_classrooms(db: Session = Depends(get_db)):
    return get_all_classrooms(db)


# GET ONE
@router.get("/{classroom_id}", response_model=ClassroomResponse)
def get_classroom(classroom_id: int, db: Session = Depends(get_db)):
    classroom = get_classroom_by_id(db, classroom_id)
    if not classroom:
        raise HTTPException(status_code=404, detail="Classroom not found")
    return classroom


# UPDATE
@router.put("/{classroom_id}", response_model=ClassroomResponse)
def update_classroom_api(
    classroom_id: int,
    classroom: ClassroomUpdate,
    db: Session = Depends(get_db)
):
    updated = update_classroom(db, classroom_id, classroom)
    if not updated:
        raise HTTPException(status_code=404, detail="Classroom not found")
    return updated


# DELETE
@router.delete("/{classroom_id}")
def delete_classroom_api(classroom_id: int, db: Session = Depends(get_db)):
    deleted = delete_classroom(db, classroom_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Classroom not found")
    return {"message": "Classroom deleted successfully"}
