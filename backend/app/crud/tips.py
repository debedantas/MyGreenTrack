from typing import List, Optional
from schemas.tips import Tip
from db.fake_db import FakeDataBase


class TipRepository:
    def __init__(self):
        self.tip_db = FakeDataBase(Tip)

    def get_all_tips(self) -> List[Tip]:
        return self.tip_db.get_all_items()

    def get_tip(self, tip_id: int) -> Optional[Tip]:
        tip = self.tip_db.get_item(tip_id, "id")
        if not tip:
            return None
        return tip

    def create_tip(self, tip: Tip) -> None:
        self.tip_db.add_item(tip)

    def delete_tip(self, tip_id: int) -> None:
        self.tip_db.delete_item(tip_id, "id")


tip_crud = TipRepository()
