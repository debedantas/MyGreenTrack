from pydantic import BaseModel
from typing import List
from datetime import datetime


class History(BaseModel):
    id: int
    user_email: str
    value: float
    created_at: datetime


class HistoryCreate(BaseModel):
    value: float


class HistoryInDB(HistoryCreate):
    user_email: str
