from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship, Session
from db.database import Base


class UserChecklist(Base):
    __tablename__ = "user_checklists"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String(255), index=True)
    checklist_id = Column(Integer, ForeignKey("checklists.id"))
    option_id = Column(Integer, ForeignKey("checklist_options.id"))
    checked = Column(Boolean, default=False)

    # Relationship to Checklist
    checklist = relationship("Checklist", back_populates="user_responses")

    # Relationship to ChecklistOption
    option = relationship("ChecklistOption", back_populates="user_responses")
