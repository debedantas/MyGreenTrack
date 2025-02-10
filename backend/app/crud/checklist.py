from typing import List, Optional
from schemas.checklist import Checklist
from db.fake_db import FakeDataBase


class ChecklistRepository:
    def __init__(self):
        self.checklist_db = FakeDataBase(Checklist)

    def get_all_checklists(self) -> List[Checklist]:
        return self.checklist_db.get_all_items()

    def get_checklist(self, checklist_id: int) -> Optional[Checklist]:
        checklist = self.checklist_db.get_item(checklist_id, "id")
        if not checklist:
            return None
        return checklist

    def create_checklist(self, checklist: Checklist) -> None:
        self.checklist_db.add_item(checklist)

    def delete_checklist(self, checklist_id: int) -> None:
        self.checklist_db.delete_item(checklist_id, "id")


checklist_crud = ChecklistRepository()
