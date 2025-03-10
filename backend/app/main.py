from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import (
    auth,
    user,
    tips,
    content,
    checklist,
    user_checklist,
    history
)
from db.database import engine, Base

# Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)


app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router, prefix="/user")
app.include_router(auth.router, prefix="/auth")
app.include_router(tips.router, prefix="/tip")
app.include_router(content.router, prefix="/content")
app.include_router(checklist.router, prefix="/checklist")
app.include_router(user_checklist.router, prefix="/user_checklist")
app.include_router(history.router, prefix="/history")

# teste para ver se a API está rodando


@app.get("/")
def health():
    return {"message": "Hello world"}
