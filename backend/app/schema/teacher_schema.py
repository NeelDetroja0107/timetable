from pydantic import BaseModel
from pydantic import ConfigDict

class TeacherCreate(BaseModel):
    first_name: str
    last_name: str
    branch_ids: list[int]

    model_config = ConfigDict(from_attributes=True)


class TeacherUpdate(BaseModel):
    first_name: str | None = None
    last_name: str | None = None
    uid: str | None = None
    branch_ids: list[int] | None = None

    model_config = ConfigDict(from_attributes=True)


class TeacherResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    uid: str
    branch_ids: list[int] = []  # Default to empty list if no branches

    model_config = ConfigDict(from_attributes=True)