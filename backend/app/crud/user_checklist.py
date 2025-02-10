from typing import List, Optional
from schemas.user_checklist import UserChecklistResponse
from db.fake_db import FakeDataBase
from crud.checklist import checklist_crud


class UserChecklistRepository:
    def __init__(self):
        self.user_checklist_db = FakeDataBase(UserChecklistResponse)

    def get_all_user_checklists(self, user_email: str) -> List[UserChecklistResponse]:
        all_checklists = checklist_crud.get_all_checklists()
        all_responses = self.user_checklist_db.get_all_items()
        user_responses = [
            response for response in all_responses if response.user_email == user_email]

        for checklist in all_checklists:
            if not any(response.checklist_id == checklist.id for response in user_responses):
                user_responses.extend(
                    self.create_default_responses(user_email, checklist.id))

        return user_responses

    def get_checklist(self, user_email: str, checklist_id: int) -> Optional[UserChecklistResponse]:
        all_responses = self.get_all_user_checklists(user_email)
        checklist_responses = [
            response for response in all_responses if response.checklist_id == checklist_id]

        if not checklist_responses:
            checklist_responses = self.create_default_responses(
                user_email, checklist_id)

        return checklist_responses

    def update_user_checklist_response(self, user_email: str, option_id: int, checked: bool) -> Optional[UserChecklistResponse]:
        response = self.user_checklist_db.get_item(id, "id")
        user_cheklist = self.get_all_user_checklists(user_email)
        if not response or not any(response.id == id for response in user_cheklist):
            return None

        response.checked = checked
        self.user_checklist_db.update_item(id, "id", response)
        return response

    def create_user_checklist_response(self, user_email: str, checklist_id: int, option_id: int, checked: bool) -> None:
        response = UserChecklistResponse(
            id=self.user_checklist_db.data[-1].id +
            1 if self.user_checklist_db.data else 1,
            user_email=user_email,
            checklist_id=checklist_id,
            option_id=option_id,
            checked=checked
        )
        self.user_checklist_db.add_item(response)

    def create_default_responses(self, user_email: str, checklist_id: int) -> List[UserChecklistResponse]:
        checklists = checklist_crud.get_all_checklists()
        checklist = next(
            (cl for cl in checklists if cl.id == checklist_id), None)
        if checklist:
            for option in checklist.items:
                self.create_user_checklist_response(
                    user_email, checklist_id, option.id, False)
            return self.get_checklist(user_email, checklist_id)
        return []


user_checklist_crud = UserChecklistRepository()
