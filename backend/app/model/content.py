from sqlalchemy import Column, Integer, String, Date
from db.database import Base


class M_Content(Base):
    __tablename__ = "content"

    id = Column(Integer, primary_key=True, index=True)
    html = Column(String(5000))
