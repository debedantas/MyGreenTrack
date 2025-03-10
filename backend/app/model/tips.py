from sqlalchemy import Column, Integer, String, Date

from db.database import Base


class M_Tip(Base):
    __tablename__ = "tips"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    author_name = Column(String(255), index=True)
    category = Column(String(255), index=True)
    creation_date = Column(Date, index=True)
    summary = Column(String(255))
    image_link = Column(String(255), index=True, default="")
    content_id = Column(Integer, index=True)
