from fastapi import APIRouter, HTTPException, status
from typing import List
from app.schemas.user import User, Users
from app.crud.user import user_crud
router = APIRouter()


@router.get("/")
async def get_users() -> Users:
    users = user_crud.get_all_users()
    return {"users": users}


@router.get("/{user_email}")
async def get_user(user_email: str) -> User:
    user = user_crud.get_user(user_email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with {user_email} not found"
        )

    return user


@router.post("/", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_user(user_create: User) -> User:
    user = user_crud.get_user(user_create.email)
    if user is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"The user with this {user_create.email} already exists in the system",
        )
    user_crud.create_user(user_create)
    return user_create
