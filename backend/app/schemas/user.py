from pydantic import BaseModel, EmailStr
from typing import List


class User(BaseModel):
    email: EmailStr
    full_name: str


class UserInDB(User):
    hashed_password: str


class UserResponse(UserInDB):
    id: int

    class Config:
        from_attributes = True


class Users(BaseModel):
    users: List[UserInDB]
