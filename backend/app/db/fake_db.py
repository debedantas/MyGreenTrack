from typing import Type, TypeVar, Generic, List, Any, Optional

T = TypeVar("T")


class FakeDataBase(Generic[T]):
    def __init__(self, model: Type[T]):
        self.model = model
        self.data: List[T] = []

    def get_all_items(self) -> List[T]:
        return self.data

    def add_item(self, item: T):
        self.data.append(item)

    def delete_item(self, item_id: Any, id_field: str = "id"):
        self.data = [item for item in self.data if getattr(
            item, id_field, None) != item_id]

    def item_exists(self, value: Any, field: str = "id") -> bool:
        return any(getattr(item, field, None) == value for item in self.data)

    def get_item(self, value: Any, field: str = "id") -> Optional[T]:
        for item in self.data:
            if getattr(item, field, None) == value:
                return item
        return None
