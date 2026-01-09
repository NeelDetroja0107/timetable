from pydantic import BaseModel
from pydantic import ConfigDict

class BranchCreate(BaseModel):
    branch: str
    batch: str
    bid: str


class BranchUpdate(BaseModel):
    branch: str | None = None
    batch: str | None = None
    bid: str | None = None


class BranchResponse(BranchCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)
