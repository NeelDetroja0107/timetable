from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schema.division_schema import (
    DivisionCreate,
    DivisionUpdate,
    DivisionResponse
)
from app.service.division_service import (
    create_division,
    get_all_divisions,
    get_division_by_id,
    update_division,
    delete_division
)

router = APIRouter(prefix="/division", tags=["Division"])


@router.post("/", response_model=DivisionResponse)
def create(division: DivisionCreate, db: Session = Depends(get_db)):
    return create_division(db, division)


@router.get("/", response_model=list[DivisionResponse])
def get_all(db: Session = Depends(get_db)):
    return get_all_divisions(db)


@router.get("/{division_id}", response_model=DivisionResponse)
def get_one(division_id: int, db: Session = Depends(get_db)):
    division = get_division_by_id(db, division_id)
    if not division:
        raise HTTPException(status_code=404, detail="Division not found")
    return division


@router.put("/{division_id}", response_model=DivisionResponse)
def update(
    division_id: int,
    division: DivisionUpdate,
    db: Session = Depends(get_db)
):
    updated = update_division(db, division_id, division)
    if not updated:
        raise HTTPException(status_code=404, detail="Division not found")
    return updated


@router.delete("/{division_id}")
def delete(division_id: int, db: Session = Depends(get_db)):
    if not delete_division(db, division_id):
        raise HTTPException(status_code=404, detail="Division not found")
    return {"message": "Division deleted successfully"}
