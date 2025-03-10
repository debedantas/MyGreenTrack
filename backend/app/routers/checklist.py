from typing import List
from fastapi import APIRouter, HTTPException, status, Depends
from schemas.checklist import Checklist, ChecklistCreate
from crud.checklist import checklist_crud
from db.database import get_db
from sqlalchemy.orm import Session
from routers.dependencies import get_current_active_super_user

router = APIRouter()


@router.get("/", response_model=List[Checklist])
async def get_checklists(db: Session = Depends(get_db)):
    checklists = checklist_crud.get_all_checklists(db)
    return checklists


@router.get("/{checklist_id}", response_model=Checklist)
async def get_checklist(checklist_id: int, db: Session = Depends(get_db)):
    checklist = checklist_crud.get_checklist(db, checklist_id)
    if not checklist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Checklist with ID {checklist_id} not found"
        )
    return checklist


@router.post("/", response_model=Checklist, status_code=status.HTTP_201_CREATED)
async def create_checklist(
    checklist_create: ChecklistCreate,
    db: Session = Depends(get_db),
    super_user=Depends(get_current_active_super_user)
):
    checklist = checklist_crud.create(db, checklist_create)
    return checklist


@router.delete("/{checklist_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_checklist(
    checklist_id: int,
    db: Session = Depends(get_db),
    super_user=Depends(get_current_active_super_user)
):
    checklist = checklist_crud.get_checklist(db, checklist_id)
    if not checklist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Checklist with ID {checklist_id} not found"
        )
    checklist_crud.delete(db, checklist)
