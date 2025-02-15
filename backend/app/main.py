from fastapi import FastAPI
from routers import (
    auth,
    user,
    tips,
    checklist,
    user_checklist
)

app = FastAPI()

app.include_router(user.router, prefix="/user")
app.include_router(auth.router, prefix="/auth")
app.include_router(tips.router, prefix="/tip")
app.include_router(checklist.router, prefix="/checklist")
app.include_router(user_checklist.router, prefix="/user_checklist")

# teste para ver se a API está rodando


@app.get("/")
def health():
    return {"message": "Hello world"}
