from pydantic import BaseModel
from pydantic.config import ConfigDict

class SubjectCreate(BaseModel):
    subject: str
    course_code: str
    teaching_hours: int
    branch_id: int


class SubjectUpdate(BaseModel):
    subject: str | None = None
    course_code: str | None = None
    teaching_hours: int | None = None
    branch_id: int | None = None


class SubjectResponse(SubjectCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)
