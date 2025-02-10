from pydantic import BaseModel, EmailStr
from typing import List
from enum import Enum


class UserType(str, Enum):
    admin = "admin"
    user = "user"
    colaborator = "colaborator"


class User(BaseModel):
    email: EmailStr
    full_name: str
    type: UserType


class UserInDB(User):
    hashed_password: str


class Users(BaseModel):
    users: List[UserInDB]
