from pydantic import BaseModel
from typing import List


class ChecklistOptionResponse(BaseModel):
    id: int
    option_text: str
    checked: bool


class UserChecklistResponse(BaseModel):
    id: int
    title: str
    options: List[ChecklistOptionResponse]

    class Config:
        orm_mode = True
