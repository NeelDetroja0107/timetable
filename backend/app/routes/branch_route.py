from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schema.branch_schema import BranchCreate, BranchUpdate, BranchResponse
from app.service.branch_service import *

router = APIRouter(prefix="/branch", tags=["Branch"])

@router.post("/", response_model=BranchResponse)
def create(branch: BranchCreate, db: Session = Depends(get_db)):
    return create_branch(db, branch)

@router.get("/", response_model=list[BranchResponse])
def get_all(db: Session = Depends(get_db)):
    return get_all_branches(db)

@router.get("/{branch_id}", response_model=BranchResponse)
def get_one(branch_id: int, db: Session = Depends(get_db)):
    branch = get_branch_by_id(db, branch_id)
    if not branch:
        raise HTTPException(404, "Branch not found")
    return branch

@router.put("/{branch_id}", response_model=BranchResponse)
def update(branch_id: int, branch: BranchUpdate, db: Session = Depends(get_db)):
    updated = update_branch(db, branch_id, branch)
    if not updated:
        raise HTTPException(404, "Branch not found")
    return updated

@router.delete("/{branch_id}")
def delete(branch_id: int, db: Session = Depends(get_db)):
    if not delete_branch(db, branch_id):
        raise HTTPException(404, "Branch not found")
    return {"message": "Branch deleted"}
