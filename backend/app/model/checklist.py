from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from db.database import Base


class ChecklistOption(Base):
    __tablename__ = "checklist_options"

    id = Column(Integer, primary_key=True, index=True)
    option_text = Column(String(255), index=True)
    checklist_id = Column(Integer, ForeignKey("checklists.id"))
    checklist = relationship("Checklist", back_populates="options")
    user_responses = relationship("UserChecklist", back_populates="option")


class Checklist(Base):
    __tablename__ = "checklists"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    category = Column(String(255), index=True)
    options = relationship(
        "ChecklistOption", back_populates="checklist", cascade="all, delete-orphan")
    user_responses = relationship("UserChecklist", back_populates="checklist")
