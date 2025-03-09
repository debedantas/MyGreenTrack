from fastapi import APIRouter, HTTPException, status, Depends
from schemas.content import Content, Contents
from crud.content import content_repository
from db.database import get_db
from sqlalchemy.orm import Session

router = APIRouter()


@router.get("/")
async def get_contents(db: Session = Depends(get_db)) -> Contents:
    contents = content_repository.find_all(db)
    return {"contents": contents}


@router.get("/content/{content_id}")
async def get_content(content_id: int, db: Session = Depends(get_db)) -> Content:
    content = content_repository.find_by_id(db, content_id)
    if not content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Content with {content_id} not found"
        )
    return content


@router.post("/create", response_model=Content, status_code=status.HTTP_201_CREATED)
async def create_content(content_create: Content, db: Session = Depends(get_db)) -> Content:
    content = content_repository.create(db, content_create)
    return content

