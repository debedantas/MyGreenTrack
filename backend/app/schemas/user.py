from pydantic import BaseModel, EmailStr
from typing import List


class User(BaseModel):
    email: EmailStr
    full_name: str
    password: str


class Users(BaseModel):
    users: List[User]
