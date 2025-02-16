from typing import List, Optional
from schemas.content import Content
from db.fake_db import FakeDataBase

class ContentRepository:
    def __init__(self):
        self.content_db = FakeDataBase(Content)

    def get_all_content(self) -> List[Content]:
        return self.content_db.get_all_items()

    def get_content(self, content_id: int) -> Optional[Content]:
        content = self.content_db.get_item(content_id, "id")
        if not content:
            return None
        return content

    def create_content(self, content: Content) -> None:
        self.content_db.add_item(content)

    def delete_content(self, content_id: int) -> None:
        self.content_db.delete_item(content_id, "id")


content_crud = ContentRepository()