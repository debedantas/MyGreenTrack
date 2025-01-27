from pydantic import BaseModel, EmailStr


class Token(BaseModel):
    access_token: str
    token_type: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserRegister(UserLogin):
    full_name: str
