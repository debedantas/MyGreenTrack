from fastapi import FastAPI
from routers import user, tips

app = FastAPI()

app.include_router(user.router, prefix="/user")
app.include_router(tips.router, prefix="/tip")