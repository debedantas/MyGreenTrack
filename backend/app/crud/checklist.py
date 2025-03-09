from typing import List, Optional
from crud.base_crud import CRUDRepository
from sqlalchemy.orm import Session, joinedload
from model.checklist import Checklist, ChecklistOption
from schemas.checklist import ChecklistCreate


class ChecklistRepository(CRUDRepository):
    def get_all_checklists(self, db: Session) -> List[Checklist]:
        return db.query(Checklist).options(joinedload(Checklist.options)).all()

    def get_checklist(self, db: Session, checklist_id: int) -> Optional[Checklist]:
        return (
            db.query(Checklist)
            .options(joinedload(Checklist.options))
            .filter(Checklist.id == checklist_id)
            .first()
        )

    def create(self, db: Session, checklist_create: ChecklistCreate) -> Checklist:
        checklist_data = checklist_create.model_dump()
        options_data = checklist_data.pop("options", [])

        db_checklist = Checklist(**checklist_data)
        db.add(db_checklist)
        db.commit()
        db.refresh(db_checklist)

        for option in options_data:
            db_option = ChecklistOption(**option, checklist_id=db_checklist.id)
            db.add(db_option)

        db.commit()
        db.refresh(db_checklist)
        return db_checklist


checklist_crud = ChecklistRepository(model=Checklist)
