from pydantic import BaseModel
from typing import List


class ChecklistOptionCreate(BaseModel):
    option_text: str


class ChecklistCreate(BaseModel):
    title: str
    category: str
    options: List[ChecklistOptionCreate]


class ChecklistOption(BaseModel):
    id: int
    option_text: str

    class Config:
        orm_mode = True


class Checklist(BaseModel):
    id: int
    title: str
    category: str
    options: List[ChecklistOption]

    class Config:
        orm_mode = True
