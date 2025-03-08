from pydantic import BaseModel
from typing import Generic, TypeVar, List

T = TypeVar('T')


class PaginatedResponse(BaseModel, Generic[T]):
    total_items: int
    total_pages: int
    current_page: int
    items: List[T]
