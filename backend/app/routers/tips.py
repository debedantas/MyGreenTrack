from fastapi import APIRouter, HTTPException, status, Depends
from schemas.pagination import PaginatedResponse
from schemas.tips import Tip, TipCreate
from crud.tips import tip_repository
from db.database import get_db
from sqlalchemy.orm import Session
from routers.dependencies import get_current_active_super_user

router = APIRouter()


@router.get("/")
async def get_tips(db: Session = Depends(get_db), page: int = 0) -> PaginatedResponse[Tip]:
    return tip_repository.get_paginated_tips(db, page=page)


@router.get("/tip_id/{tip_id}")
async def get_tip(tip_id: int, db: Session = Depends(get_db)) -> Tip:
    tip = tip_repository.find_by_id(db, tip_id)
    if not tip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Tip with {tip_id} not found"
        )
    return tip


@router.post("/create", response_model=Tip, status_code=status.HTTP_201_CREATED)
async def create_tip(
    tip_create: TipCreate,
    db: Session = Depends(get_db),
    super_user=Depends(get_current_active_super_user)
) -> Tip:
    tip = tip_repository.create(db, tip_create)
    return tip
