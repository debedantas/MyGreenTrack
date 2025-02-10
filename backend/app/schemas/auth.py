from pydantic import BaseModel, EmailStr
from schemas.user import UserType


class Token(BaseModel):
    access_token: str
    token_type: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserRegister(UserLogin):
    full_name: str


class UserRegisterAdmin(UserRegister):
    type: UserType
