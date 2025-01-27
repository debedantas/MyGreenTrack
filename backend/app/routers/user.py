from fastapi import APIRouter, HTTPException, status, Depends
from schemas.user import Users, UserInDB
from crud.user import user_crud
from routers.dependencies import get_current_user

router = APIRouter()


@router.get("/")
async def get_users() -> Users:
    users = user_crud.get_all_users()
    return {"users": users}


@router.get("/email/{user_email}")
async def get_user(user_email: str) -> UserInDB:
    user = user_crud.get_user(user_email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with {user_email} not found"
        )
    return user


@router.get("/me", response_model=UserInDB)
async def read_users_me(current_user: UserInDB = Depends(get_current_user)):
    return current_user
