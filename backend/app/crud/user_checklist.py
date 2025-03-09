from typing import List, Optional
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import func
from schemas.pagination import PaginatedResponse
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
        user_email: str,
        page: int = 1,
        per_page: int = 3  # Allow customization of items per page
    ) -> PaginatedResponse[UserChecklistResponse]:  # Use generic response
        # Calculate total checklists
        total_items = db.query(func.count(Checklist.id)).scalar()
        total_pages = (total_items + per_page - 1) // per_page
        page = max(page, 1)

        # Get paginated checklists
        checklists = db.query(Checklist).options(
            joinedload(Checklist.options)
        ).order_by(Checklist.id).offset((page - 1) * per_page).limit(per_page).all()

        # Get user responses for these checklists
        checklist_ids = [c.id for c in checklists]
        user_responses = db.query(UserChecklist).filter(
            UserChecklist.user_email == user_email,
            UserChecklist.checklist_id.in_(checklist_ids)
        ).all()

        # Map responses to options
        response_map = {(r.checklist_id, r.option_id): r.checked for r in user_responses}

        # Build items
        items = [
            UserChecklistResponse(
                id=checklist.id,
                title=checklist.title,
                options=[
                    ChecklistOptionResponse(
                        id=option.id,
                        option_text=option.option_text,
                        checked=response_map.get(
                            (checklist.id, option.id), False))
                    for option in checklist.options
                ]
            )
            for checklist in checklists
        ]

        return PaginatedResponse(
            total_items=total_items,
            total_pages=total_pages,
            current_page=page,
            items=items
        )

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
