from fastapi import APIRouter, HTTPException, status
from schemas.tips import Tip, Tips
from crud.tips import tip_crud
router = APIRouter()


@router.get("/")
async def get_tips() -> Tips:
    tips = tip_crud.get_all_tips()
    return {"tips": tips}


@router.get("/{tip_number}")
async def get_tip(tip_number: int) -> Tip:
    tip = tip_crud.get_tip(tip_number)
    if not tip:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Tip with {tip_number} not found"
        )

    return tip


@router.post("/", response_model=Tip, status_code=status.HTTP_201_CREATED)
async def create_tip(tip_create: Tip) -> Tip:
    tip = tip_crud.get_tip(tip_create.number)
    if tip is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"The tip with this {tip_create.number} already exists in the system",
        )
    tip_crud.create_tip(tip_create)
    return tip_create


