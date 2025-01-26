from fastapi import APIRouter, HTTPException, status
from app.schemas.auth import Token, UserLogin, UserRegister
from app.schemas.user import UserInDB
from app.crud.user import user_crud
from app.security import create_access_token, get_password_hash
router = APIRouter()


@router.post("/login", response_model=Token)
async def login(user_login: UserLogin):
    user = user_crud.authenticate_user(user_login.email, user_login.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )

    access_token = create_access_token(user.email)
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register", response_model=UserInDB, status_code=status.HTTP_201_CREATED)
async def create_user(user_create: UserRegister) -> UserInDB:
    user = user_crud.get_user(user_create.email)
    if user is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"The user with this {user_create.email} already exists in the system",
        )
    userIn = UserInDB(email=user_create.email, full_name=user_create.full_name,
                      hashed_password=get_password_hash(user_create.password))
    user_crud.create_user(userIn)
    return userIn
