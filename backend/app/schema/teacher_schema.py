from typing import List
from pydantic import BaseModel

class TeacherCreate(BaseModel):
    first_name: str
    last_name: str
    uid: str
    branch_ids: List[int]


class TeacherUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    uid: str | None = None
    branch_ids: List[int] | None = None


class TeacherResponse(TeacherCreate):
    id: int

    class Config:
        from_attributes = True
