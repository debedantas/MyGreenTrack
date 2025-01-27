from typing import List, Optional
from schemas.user import UserInDB
from db.fake_db import FakeDataBase
from security import verify_password



class UserRepository:
    def __init__(self):
        self.user_db = FakeDataBase(UserInDB)
        user = UserInDB(email="user@example.com", full_name="string",
                        hashed_password="$2b$12$76sdl6It7zWmRSVIUofC0eDE0ujtr6G/VC4U6uCkp1V8ldzEbJIL2")
        self.user_db.add_item(user)

    def get_all_users(self) -> List[UserInDB]:
        return self.user_db.get_all_items()

    def get_user(self, user_email: str) -> Optional[UserInDB]:
        user = self.user_db.get_item(user_email, "email")
        if not user:
            return None
        return user

    def create_user(self, user: UserInDB) -> None:
        self.user_db.add_item(user)

    def delete_user(self, user_email: str) -> None:
        self.user_db.delete_item(user_email, "email")

    def authenticate_user(self, email: str, password: str) -> Optional[UserInDB]:
        user = self.get_user(email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user


user_crud = UserRepository()
