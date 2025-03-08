from fastapi import APIRouter, HTTPException, status, Depends
from schemas.pagination import PaginatedResponse
from schemas.user_checklist import UserChecklistResponse
from schemas.user import UserInDB
from routers.dependencies import get_current_user
from crud.user_checklist import user_checklist_crud
from typing import List
from db.database import get_db

router = APIRouter()


@router.get("/")
async def get_user_checklists(
    current_user: UserInDB = Depends(get_current_user),
    db=Depends(get_db),
    page: int = 1,
    per_page: int = 3  # Optional: Let clients specify items per page
) -> PaginatedResponse[UserChecklistResponse]:
    return user_checklist_crud.get_all_user_checklists(
        db, current_user.email, page, per_page
    )


@router.get("/{checklist_id}", response_model=List[UserChecklistResponse])
async def get_user_checklist(checklist_id: int, current_user: UserInDB = Depends(get_current_user), db=Depends(get_db)) -> List[UserChecklistResponse]:
    checklists = user_checklist_crud.get_checklist_responses(
        db, current_user.email, checklist_id)
    return checklists


@router.put("/{option_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_user_checklist_response(option_id: int, checked: bool, current_user: UserInDB = Depends(get_current_user),  db=Depends(get_db)):
    response = user_checklist_crud.update_response(
        db, current_user.email, option_id, checked)
    if not response:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User checklist response with option ID {option_id} not found"
        )
