from fastapi import APIRouter, HTTPException, status, Depends
from schemas.user_checklist import UserChecklistResponse
from schemas.user import UserInDB
from routers.dependencies import get_current_user
from crud.user_checklist import user_checklist_crud
from typing import List


router = APIRouter()


@router.get("/", response_model=List[UserChecklistResponse])
async def get_user_checklists(current_user: UserInDB = Depends(get_current_user)) -> List[UserChecklistResponse]:
    checklists = user_checklist_crud.get_all_user_checklists(
        current_user.email)
    return checklists


@router.get("/{checklist_id}", response_model=List[UserChecklistResponse])
async def get_user_checklist(checklist_id: int, current_user: UserInDB = Depends(get_current_user)) -> List[UserChecklistResponse]:
    checklists = user_checklist_crud.get_checklist(
        current_user.email, checklist_id)
    return checklists


@router.put("/{id}", response_model=UserChecklistResponse)
async def update_user_checklist_response(id: int, checked: bool, current_user: UserInDB = Depends(get_current_user)) -> UserChecklistResponse:
    response = user_checklist_crud.update_user_checklist_response(
        current_user.email, id, checked)
    if not response:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User checklist response with ID {id} not found"
        )

    return response
