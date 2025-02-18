from typing import List
from sqlalchemy.orm import Session
from model.user import User
from crud.base_crud import CRUDRepository
from security import verify_password


class UserRepository(CRUDRepository):
    def find_all(self, db: Session) -> User:
        return db.query(User).all()

    def find_by_email(self, db: Session, email: str) -> List[User]:
        return db.query(User).filter(User.email == email).first()

    def authenticate_user(self, db: Session, email: str, password: str) -> User:
        user = self.find_by_email(db, email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user


user_repository = UserRepository(model=User)
