from fastapi import FastAPI
from routers import (
    auth,
    user,
    tips
)


app = FastAPI()

app.include_router(user.router, prefix="/user")
app.include_router(auth.router, prefix="/auth")
app.include_router(tips.router, prefix="/tip")

# teste para ver se a API está rodando
@app.get("/")
def health():
    return {"message": "Hello world"}

