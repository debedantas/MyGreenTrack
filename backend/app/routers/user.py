from fastapi import APIRouter, HTTPException, status, Depends
from schemas.user import Users, UserInDB, UserResponse
from model.user import User
from crud.user_new import user_repository
from routers.dependencies import get_current_user
from db.database import get_db
from sqlalchemy.orm import Session

router = APIRouter()


@router.get("/")
async def get_users(db: Session = Depends(get_db)) -> Users:
    users = user_repository.find_all(db)
    return {"users": users}


@router.get("/email/{user_email}")
async def get_user(user_email: str, db: Session = Depends(get_db)) -> UserInDB:
    user = user_repository.find_by_email(db, user_email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with {user_email} not found"
        )
    return user


@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
