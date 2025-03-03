from sqlalchemy import Column, Integer, String, Enum
import enum

from db.database import Base


class UserType(enum.Enum):
    user = "user"
    admin = "admin"


class M_Tip(Base):
    __tablename__ = "tips"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    author_name = Column(String(255), index=True)
    category = Column(String(255), index=True)
    creation_date = Column(String(255), index=True)
    summary = Column(String(255))
    content_id = Column(Integer, index=True)
    type = Column(Enum(UserType), default="admin")
