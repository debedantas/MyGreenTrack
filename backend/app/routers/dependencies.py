from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from app.security import decode_jwt
from app.crud.user import user_crud

oauth2_scheme = HTTPBearer()


async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = decode_jwt(token.credentials)
        email: str = payload.get("email")
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        user = user_crud.get_user(email)
        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        ) from e
