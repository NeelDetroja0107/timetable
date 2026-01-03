from pydantic import BaseModel

class ClassroomCreate(BaseModel):
    block: str
    room: str
    uid: str


class ClassroomUpdate(BaseModel):
    block: str | None = None
    room: str | None = None
    uid: str | None = None


class ClassroomResponse(ClassroomCreate):
    id: int

    class Config:
        from_attributes = True
