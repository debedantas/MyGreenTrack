from typing import List, Optional
from schemas.user import User
from db.fake_db import FakeDataBase


class UserRepository:
    def __init__(self):
        self.user_db = FakeDataBase(User)

    def get_all_users(self) -> List[User]:
        return self.user_db.get_all_items()

    def get_user(self, user_email: str) -> Optional[User]:
        user = self.user_db.get_item(user_email, "email")
        if not user:
            return None
        return user

    def create_user(self, user: User) -> None:
        self.user_db.add_item(user)

    def delete_user(self, user_email: str) -> None:
        self.user_db.delete_item(user_email, "email")


user_crud = UserRepository()
