from pydantic import BaseModel
from typing import List


class ChecklistOption(BaseModel):
    id: int
    text: str


class Checklist(BaseModel):
    id: int
    title: str
    items: List[ChecklistOption]


class Checklists(BaseModel):
    checklists: List[Checklist]
