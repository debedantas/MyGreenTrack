from fastapi import APIRouter, HTTPException, status
from schemas.user_checklist import UserChecklistResponse
from crud.user_checklist import user_checklist_crud
from typing import List


router = APIRouter()


@router.get("/{user_email}", response_model=List[UserChecklistResponse])
async def get_user_checklists(user_email: str) -> List[UserChecklistResponse]:
    checklists = user_checklist_crud.get_all_user_checklists(user_email)
    return checklists


@router.get("/{user_email}/{checklist_id}", response_model=List[UserChecklistResponse])
async def get_user_checklist(user_email: str, checklist_id: int) -> List[UserChecklistResponse]:
    checklist = user_checklist_crud.get_checklist(user_email, checklist_id)
    return checklist


@router.put("/{id}", response_model=UserChecklistResponse)
async def update_user_checklist_response(id: int, checked: bool) -> UserChecklistResponse:
    response = user_checklist_crud.update_user_checklist_response(id, checked)
    if not response:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User checklist response with ID {id} not found"
        )
    return response
