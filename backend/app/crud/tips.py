from typing import List, Optional
from schemas.tips import Tip
from db.fake_db import FakeDataBase


class TipRepository:
    def __init__(self):
        self.tip_db = FakeDataBase(Tip)

    def get_all_tips(self) -> List[Tip]:
        return self.tip_db.get_all_items()

<<<<<<< HEAD
    def get_tip(self, tip_id: int) -> Optional[Tip]:
        tip = self.tip_db.get_item(tip_id, "id")
=======
    def get_tip(self, tip_number: int) -> Optional[Tip]:
        tip = self.tip_db.get_item(tip_number, "number")
>>>>>>> 217eaedf34ee19e3fb504a14d5b608f7f54a4509
        if not tip:
            return None
        return tip

    def create_tip(self, tip: Tip) -> None:
        self.tip_db.add_item(tip)

<<<<<<< HEAD
    def delete_tip(self, tip_id: int) -> None:
        self.tip_db.delete_item(tip_id, "id")
=======
    def delete_tip(self, tip_number: int) -> None:
        self.tip_db.delete_item(tip_number, "number")
>>>>>>> 217eaedf34ee19e3fb504a14d5b608f7f54a4509


tip_crud = TipRepository()
