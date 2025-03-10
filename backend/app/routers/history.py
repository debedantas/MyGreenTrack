from fastapi import APIRouter, status, Depends
from db.database import get_db
from sqlalchemy.orm import Session
from routers.dependencies import get_current_user
from crud.history_crud import history_repository
from schemas.history import History, HistoryCreate, HistoryInDB
from typing import List

router = APIRouter()


@router.post("/", response_model=History, status_code=status.HTTP_201_CREATED)
async def create_history(
    history_create: HistoryCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
) -> History:
    historyInDB = HistoryInDB(
        user_email=user.email, value=history_create.value)
    history = history_repository.create(db, historyInDB)
    return history


@router.get("/", response_model=List[History])
async def get_history(db: Session = Depends(get_db), user=Depends(get_current_user)) -> List[History]:
    return history_repository.find_all(db, user.email)


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_history(id, db: Session = Depends(get_db), user=Depends(get_current_user)):
    history = history_repository.find_by_id(db, id)
    print(history)
    if history is None:
        return status.HTTP_404_NOT_FOUND
    if history.user_email != user.email:
        return status.HTTP_401_UNAUTHORIZED
    history_repository.delete(db, history)
