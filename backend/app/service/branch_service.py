from sqlalchemy.orm import Session
from app.models import Branch
from app.schema.branch_schema import BranchCreate, BranchUpdate

def create_branch(db: Session, branch: BranchCreate):
    db_branch = Branch(**branch.dict())
    db.add(db_branch)
    db.commit()
    db.refresh(db_branch)
    return db_branch

def get_all_branches(db: Session):
    return db.query(Branch).all()

def get_branch_by_id(db: Session, branch_id: int):
    return db.query(Branch).filter(Branch.id == branch_id).first()

def update_branch(db: Session, branch_id: int, branch: BranchUpdate):
    db_branch = get_branch_by_id(db, branch_id)
    if not db_branch:
        return None

    for key, value in branch.dict(exclude_unset=True).items():
        setattr(db_branch, key, value)

    db.commit()
    db.refresh(db_branch)
    return db_branch

def delete_branch(db: Session, branch_id: int):
    db_branch = get_branch_by_id(db, branch_id)
    if not db_branch:
        return None

    db.delete(db_branch)
    db.commit()
    return True
