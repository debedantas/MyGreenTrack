from passlib.context import CryptContext
from datetime import datetime, timezone, timedelta
from schemas.auth import Token
import jwt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(email: str) -> Token:
    expire = datetime.now(timezone.utc) + timedelta(minutes=30)
    payload = {
        "email": email,
        "exp": expire
    }
    encode = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return encode


def decode_jwt(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        expire_date = datetime.fromtimestamp(
            decoded_token["exp"], tz=timezone.utc
        )
        return decoded_token if expire_date >= datetime.now(timezone.utc) else None
    except:
        return {}
