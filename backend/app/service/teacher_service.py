from sqlalchemy.orm import Session
from app.models import Teacher, Branch
from app.schema.teacher_schema import TeacherCreate, TeacherUpdate, TeacherResponse

def create_teacher(db: Session, teacher: TeacherCreate):
    existing_teacher = db.query(Teacher).filter(Teacher.uid == teacher.uid).first()
    if existing_teacher:
        raise ValueError(f"Teacher with UID '{teacher.uid}' already exists.")
    
    teacher_data = teacher.model_dump(exclude={"branch_ids"})
    db_teacher = Teacher(**teacher_data)

    if teacher.branch_ids:
        branches = db.query(Branch).filter(Branch.id.in_(teacher.branch_ids)).all()
        db_teacher.branches = branches

    db.add(db_teacher)
    db.commit()
    db.refresh(db_teacher)
    return TeacherResponse.from_orm(db_teacher)


def get_all_teachers(db: Session):
    return db.query(Teacher).all()


def get_teacher_by_id(db: Session, teacher_id: int):
    return db.query(Teacher).filter(Teacher.id == teacher_id).first()


def update_teacher(db: Session, teacher_id: int, teacher: TeacherUpdate):
    db_teacher = get_teacher_by_id(db, teacher_id)
    if not db_teacher:
        return None

    data = teacher.model_dump(exclude_unset=True)

    if "branch_ids" in data:
        db_teacher.branches.clear()
        branches = (
            db.query(Branch)
            .filter(Branch.id.in_(data["branch_ids"]))
            .all()
        )
        db_teacher.branches.extend(branches)
        data.pop("branch_ids")

    for key, value in data.items():
        setattr(db_teacher, key, value)

    db.commit()
    db.refresh(db_teacher)
    return TeacherResponse.from_orm(db_teacher)


def delete_teacher(db: Session, teacher_id: int):
    db_teacher = get_teacher_by_id(db, teacher_id)
    if not db_teacher:
        return None

    db.delete(db_teacher)
    db.commit()
    return True
