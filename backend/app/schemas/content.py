from pydantic import BaseModel
from typing import List


class Content(BaseModel):
    id: int
    html: str


class Contents(BaseModel):
    tips: List[Content]
