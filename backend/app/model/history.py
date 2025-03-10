from sqlalchemy import Column, Integer, String, DateTime, Float
from db.database import Base
import datetime


class History(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String(100))
    value = Column(Float)
    created_at = Column(DateTime, default=datetime.datetime.now)
