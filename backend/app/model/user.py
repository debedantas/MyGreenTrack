from sqlalchemy import Column, Integer, String, Enum
import enum

from db.database import Base


class UserType(enum.Enum):
    user = "user"
    collaborator = "collaborator"
    admin = "admin"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(255), index=True)
    email = Column(String(255), unique=True, index=True)
    hashed_password = Column(String(255))
    type = Column(Enum(UserType), default="user")
