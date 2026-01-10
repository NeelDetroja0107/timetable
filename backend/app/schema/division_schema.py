from pydantic import BaseModel
from pydantic import ConfigDict

class DivisionCreate(BaseModel):
    division: str
    branch_id: int


class DivisionUpdate(BaseModel):
    division: str | None = None
    branch_id: int | None = None


class DivisionResponse(DivisionCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)
