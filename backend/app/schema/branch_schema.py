from pydantic import BaseModel

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

    class Config:
        from_attributes = True
