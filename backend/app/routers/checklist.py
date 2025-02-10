from fastapi import APIRouter, HTTPException, status, Depends
from schemas.checklist import Checklist, Checklists
from crud.checklist import checklist_crud
from routers.dependencies import get_current_active_super_user

router = APIRouter()


@router.get("/", response_model=Checklists)
async def get_checklists() -> Checklists:
    checklists = checklist_crud.get_all_checklists()
    return {"checklists": checklists}


@router.get("/{checklist_id}", response_model=Checklist)
async def get_checklist(checklist_id: int) -> Checklist:
    checklist = checklist_crud.get_checklist(checklist_id)
    if not checklist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Checklist with ID {checklist_id} not found"
        )
    return checklist


@router.post("/", response_model=Checklist, status_code=status.HTTP_201_CREATED)
async def create_checklist(checklist_create: Checklist, super_user=Depends(get_current_active_super_user)) -> Checklist:
    checklist = checklist_crud.get_checklist(checklist_create.id)
    if checklist is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"The checklist with ID {checklist_create.id} already exists in the system",
        )
    checklist_crud.create_checklist(checklist_create)
    return checklist_create


@router.delete("/{checklist_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_checklist(checklist_id: int) -> None:
    checklist = checklist_crud.get_checklist(checklist_id)
    if not checklist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Checklist with ID {checklist_id} not found"
        )
    checklist_crud.delete_checklist(checklist_id)
