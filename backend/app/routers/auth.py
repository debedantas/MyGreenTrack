from fastapi import APIRouter, HTTPException, status, Depends
from schemas.auth import Token, UserLogin, UserRegister
from schemas.user import UserInDB, UserResponse
from crud.user import user_repository
from security import create_access_token, get_password_hash
from sqlalchemy.orm import Session
from db.database import get_db
router = APIRouter()


@router.post("/login", response_model=Token)
async def login(user_login: UserLogin, db: Session = Depends(get_db)) -> Token:
    user = user_repository.authenticate_user(
        db, user_login.email, user_login.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )

    access_token = create_access_token(user.email)
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(user_create: UserRegister, db: Session = Depends(get_db)) -> UserResponse:
    user = user_repository.find_by_email(db, user_create.email)
    if user is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"The user with this {user_create.email} already exists in the system",
        )
    userIn = UserInDB(email=user_create.email, full_name=user_create.full_name,
                      hashed_password=get_password_hash(user_create.password))
    user_db = user_repository.create(db, userIn)
    return user_db
