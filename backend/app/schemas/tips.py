from pydantic import BaseModel
from typing import List


class Tip(BaseModel):
    id: int
    title: str
    author_name: str
    category: str
    creation_date: str
    summary: str
    content_id: int

    class Config:
        orm_mode = True


class TipCreate(BaseModel):
    title: str
    author_name: str
    category: str
    creation_date: str
    summary: str
    content_id: int
