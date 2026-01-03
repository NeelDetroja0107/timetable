from sqlalchemy.orm import Session
from app.models import Classroom
from app.schema.classroom_schema import ClassroomCreate, ClassroomUpdate

# CREATE
def create_classroom(db: Session, classroom: ClassroomCreate):
    db_classroom = Classroom(**classroom.dict())
    db.add(db_classroom)
    db.commit()
    db.refresh(db_classroom)
    return db_classroom


# GET ALL
def get_all_classrooms(db: Session):
    return db.query(Classroom).all()


# GET ONE
def get_classroom_by_id(db: Session, classroom_id: int):
    return db.query(Classroom).filter(Classroom.id == classroom_id).first()


# UPDATE
def update_classroom(db: Session, classroom_id: int, classroom: ClassroomUpdate):
    db_classroom = get_classroom_by_id(db, classroom_id)
    if not db_classroom:
        return None

    for key, value in classroom.dict(exclude_unset=True).items():
        setattr(db_classroom, key, value)

    db.commit()
    db.refresh(db_classroom)
    return db_classroom


# DELETE
def delete_classroom(db: Session, classroom_id: int):
    db_classroom = get_classroom_by_id(db, classroom_id)
    if not db_classroom:
        return None

    db.delete(db_classroom)
    db.commit()
    return True
