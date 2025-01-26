from fastapi import FastAPI
from app.routers import (
    auth,
    user
)

app = FastAPI()

app.include_router(user.router, prefix="/user")
app.include_router(auth.router, prefix="/auth")


# teste para ver se a API está rodando
@app.get("/")
def health():
    return {"message": "Hello world"}
