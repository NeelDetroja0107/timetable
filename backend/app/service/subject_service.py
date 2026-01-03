from sqlalchemy.orm import Session
from app.models import Subject
from app.schema.subject_schema import SubjectCreate, SubjectUpdate

def create_subject(db: Session, subject: SubjectCreate):
    db_subject = Subject(**subject.dict())
    db.add(db_subject)
    db.commit()
    db.refresh(db_subject)
    return db_subject

def get_all_subjects(db: Session):
    return db.query(Subject).all()

def get_subject_by_id(db: Session, subject_id: int):
    return db.query(Subject).filter(Subject.id == subject_id).first()

def update_subject(db: Session, subject_id: int, subject: SubjectUpdate):
    db_subject = get_subject_by_id(db, subject_id)
    if not db_subject:
        return None

    for key, value in subject.dict(exclude_unset=True).items():
        setattr(db_subject, key, value)

    db.commit()
    db.refresh(db_subject)
    return db_subject

def delete_subject(db: Session, subject_id: int):
    db_subject = get_subject_by_id(db, subject_id)
    if not db_subject:
        return None

    db.delete(db_subject)
    db.commit()
    return True
