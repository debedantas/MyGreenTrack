from typing import List, Optional
from sqlalchemy.orm import Session, joinedload
from schemas.user_checklist import UserChecklistResponse, ChecklistOptionResponse
from crud.base_crud import CRUDRepository
from crud.checklist import checklist_crud
from model.user_checklist import UserChecklist
from model.checklist import Checklist, ChecklistOption


class UserChecklistRepository(CRUDRepository):
    def get_user_checklist(
        self,
        db: Session,
        user_email: str,
        checklist_id: int
    ) -> Optional[UserChecklistResponse]:
        # Get the checklist with its options
        checklist = db.query(Checklist).options(
            joinedload(Checklist.options)
        ).filter(
            Checklist.id == checklist_id
        ).first()

        if not checklist:
            return None

        # Get user responses for this checklist
        user_responses = db.query(UserChecklist).filter(
            UserChecklist.user_email == user_email,
            UserChecklist.checklist_id == checklist_id
        ).all()

        # Create a mapping of option_id to checked status
        response_map = {r.option_id: r.checked for r in user_responses}

        # Build the response structure
        return UserChecklistResponse(
            id=checklist.id,
            title=checklist.title,
            options=[
                ChecklistOptionResponse(
                    id=option.id,
                    option_text=option.option_text,
                    checked=response_map.get(option.id, False)
                )
                for option in checklist.options
            ]
        )

    def get_all_user_checklists(
        self,
        db: Session,
        user_email: str
    ) -> List[UserChecklistResponse]:
        # Get all checklists with their options
        checklists = db.query(Checklist).options(
            joinedload(Checklist.options)
        ).all()

        # Get all user responses
        user_responses = db.query(UserChecklist).filter(
            UserChecklist.user_email == user_email
        ).all()

        # Create a mapping of checklist_id to option responses
        response_map = {
            (r.checklist_id, r.option_id): r.checked
            for r in user_responses
        }

        # Build the response structure
        return [
            UserChecklistResponse(
                id=checklist.id,
                title=checklist.title,
                options=[
                    ChecklistOptionResponse(
                        id=option.id,
                        option_text=option.option_text,
                        checked=response_map.get(
                            (checklist.id, option.id), False
                        )
                    )
                    for option in checklist.options
                ]
            )
            for checklist in checklists
        ]

    def update_response(
        self,
        db: Session,
        user_email: str,
        option_id: int,
        checked: bool
    ) -> bool:
        response = db.query(self.model).filter(
            self.model.option_id == option_id,
            self.model.user_email == user_email
        ).first()

        if response:
            print("here")
            response.checked = checked
        else:
            option = db.query(ChecklistOption).filter(
                ChecklistOption.id == option_id
            ).first()

            if not option:
                return False  # Option doesn't exist

            response = self.model(
                user_email=user_email,
                checklist_id=option.checklist_id,
                option_id=option_id,
                checked=checked
            )
            db.add(response)

        db.commit()
        db.refresh(response)
        return True


user_checklist_crud = UserChecklistRepository(model=UserChecklist)
