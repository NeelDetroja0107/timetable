from sqlalchemy.orm import Session
from app.models import Division
from app.schema.division_schema import DivisionCreate, DivisionUpdate

def create_division(db: Session, division: DivisionCreate):
    db_division = Division(**division.dict())
    db.add(db_division)
    db.commit()
    db.refresh(db_division)
    return db_division

def get_all_divisions(db: Session):
    return db.query(Division).all()

def get_division_by_id(db: Session, division_id: int):
    return db.query(Division).filter(Division.id == division_id).first()

def update_division(db: Session, division_id: int, division: DivisionUpdate):
    db_division = get_division_by_id(db, division_id)
    if not db_division:
        return None

    for key, value in division.dict(exclude_unset=True).items():
        setattr(db_division, key, value)

    db.commit()
    db.refresh(db_division)
    return db_division

def delete_division(db: Session, division_id: int):
    db_division = get_division_by_id(db, division_id)
    if not db_division:
        return None

    db.delete(db_division)
    db.commit()
    return True
