from fastapi import APIRouter, HTTPException, status, Depends
from schemas.auth import Token, UserLogin, UserRegister, UserRegisterAdmin
from schemas.user import UserInDB, UserType
from crud.user import user_crud
from security import create_access_token, get_password_hash
from routers.dependencies import get_current_active_super_user
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
    userIn = UserInDB(email=user_create.email, full_name=user_create.full_name, type=UserType.user,
                      hashed_password=get_password_hash(user_create.password))
    user_crud.create_user(userIn)
    return userIn


@router.post("/register/admin", response_model=UserInDB, status_code=status.HTTP_201_CREATED)
async def create_admin(user_create: UserRegisterAdmin, super_user=Depends(get_current_active_super_user)) -> UserInDB:
    user = user_crud.get_user(user_create.email)
    if user is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"The user with this {user_create.email} already exists in the system",
        )
    userIn = UserInDB(email=user_create.email, full_name=user_create.full_name, type=UserType.admin,
                      hashed_password=get_password_hash(user_create.password))
    user_crud.create_user(userIn)
    return userIn
