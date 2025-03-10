from pydantic import BaseModel
from typing import List


class Content(BaseModel):
    id: int
    html: str


class ContentCreate(BaseModel):
    html: str


class Contents(BaseModel):
    contents: List[Content]
