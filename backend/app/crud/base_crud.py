from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Type, TypeVar

ORMModel = TypeVar("ORMModel")

T = TypeVar("T", bound=BaseModel)


class CRUDRepository:
    def __init__(self, model: Type[ORMModel]):
        self.model = model

    def create(self, db: Session, obj_create: T):
        db_obj_create = obj_create.model_dump()
        db_obj = self.model(**db_obj_create)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def delete(self, db: Session, obj: ORMModel) -> None:
        db.delete(obj)
        db.commit()
        return None
