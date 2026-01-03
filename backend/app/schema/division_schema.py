from pydantic import BaseModel

class DivisionCreate(BaseModel):
    division: str
    branch_id: int


class DivisionUpdate(BaseModel):
    division: str | None = None
    branch_id: int | None = None


class DivisionResponse(DivisionCreate):
    id: int

    class Config:
        from_attributes = True
