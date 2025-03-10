from typing import List
from sqlalchemy.orm import Session
from model.history import History
from crud.base_crud import CRUDRepository
from sqlalchemy import desc


class HistoryRepository(CRUDRepository):
    def find_all(self, db: Session, user_email: str) -> List[History]:
        return db.query(History).filter(History.user_email == user_email).order_by(desc(History.created_at)).all()

    def find_by_id(self, db: Session, id: int) -> History:
        return db.query(History).filter(History.id == id).first()


history_repository = HistoryRepository(model=History)
