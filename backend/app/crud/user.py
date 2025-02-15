from typing import List, Optional
from schemas.user import UserInDB
from db.mySQL_db import MySQLDatabase
from security import verify_password



class UserRepository:
    def __init__(self):
        self.db = MySQLDatabase()

    def get_user(self, user_email: str) -> Optional[UserInDB]:
        query = "SELECT * FROM users WHERE email = %s"
        result = self.db.fetch_one(query, (user_email,))
        if result:
            return UserInDB(email=result[1], full_name=result[2], type=result[3], hashed_password=result[4])
        return None

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
