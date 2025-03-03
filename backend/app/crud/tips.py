from typing import List
from sqlalchemy.orm import Session
from model.tips import M_Tip
from crud.base_crud import CRUDRepository


class TipRepository(CRUDRepository):
    def find_all(self, db: Session) -> M_Tip:
        return db.query(M_Tip).all()

    def find_by_id(self, db: Session, id: int) -> List[M_Tip]:
        return db.query(M_Tip).filter(M_Tip.id == id).first()



tip_repository = TipRepository(model=M_Tip)


#old code
"""from typing import List, Optional
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


tip_crud = TipRepository()"""
