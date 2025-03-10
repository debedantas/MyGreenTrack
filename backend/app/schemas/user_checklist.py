from pydantic import BaseModel
from typing import List
from schemas.pagination import PaginatedResponse


class ChecklistOptionResponse(BaseModel):
    id: int
    option_text: str
    checked: bool


class UserChecklistResponse(BaseModel):
    id: int
    title: str
    category: str
    options: List[ChecklistOptionResponse]

    class Config:
        orm_mode = True
