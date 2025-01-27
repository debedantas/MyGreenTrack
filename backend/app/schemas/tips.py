from pydantic import BaseModel
from typing import List


class Tip(BaseModel):
    number: int
    name: str
    content: str


class Tips(BaseModel):
    tips: List[Tip]
