from pydantic import BaseModel


class UserChecklistResponse(BaseModel):
    id: int
    user_email: str
    checklist_id: int
    option_id: int
    checked: bool
