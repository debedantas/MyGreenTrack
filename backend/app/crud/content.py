from typing import List
from sqlalchemy.orm import Session
from model.content import M_Content
from crud.base_crud import CRUDRepository


class ContentRepository(CRUDRepository):
    def find_all(self, db: Session) -> List[M_Content]:
        return db.query(M_Content).all()

    def find_by_id(self, db: Session, id: int) -> M_Content:
        return db.query(M_Content).filter(M_Content.id == id).first()



content_repository = ContentRepository(model=M_Content)