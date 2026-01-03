from sqlalchemy import Table, Column, Integer, ForeignKey
from app.database import Base

teacher_branch = Table(
    "teacher_branch",
    Base.metadata,
    Column("teacher_id", ForeignKey("teachers.id"), primary_key=True),
    Column("branch_id", ForeignKey("branches.id"), primary_key=True),
)
