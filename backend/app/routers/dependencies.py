from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from security import decode_jwt
from crud.user import user_crud
from schemas.user import UserInDB, UserType

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


async def get_current_active_super_user(current_user: UserInDB = Depends(get_current_user)):
    if current_user.type != UserType.admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The user doesn't have enough privileges",
        )
    return current_user
