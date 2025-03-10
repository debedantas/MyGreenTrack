from pydantic import BaseModel
from typing import List
from datetime import date


class Tip(BaseModel):
    id: int
    title: str
    author_name: str
    category: str
    creation_date: date
    summary: str
    image_link: str
    content_id: int

    class Config:
        orm_mode = True


class TipCreate(BaseModel):
    title: str
    author_name: str
    category: str
    creation_date: date
    summary: str
    image_link: str
    content_id: int
