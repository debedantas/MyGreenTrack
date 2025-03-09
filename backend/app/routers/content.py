from fastapi import APIRouter, HTTPException, status, Depends
from schemas.content import Content, Contents
from crud.content import content_crud
from fastapi.responses import HTMLResponse
from routers.dependencies import get_current_active_super_user
router = APIRouter()


@router.get("/", response_model=Contents)
async def get_contents() -> Contents:
    contents = content_crud.get_all_content()
    return {"contents": contents}


@router.get("/{content_id}", response_class=HTMLResponse)
async def get_content_html(content_id: int):
    content = content_crud.get_content(content_id)
    if not content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Content with {content_id} not found"
        )
    return HTMLResponse(content=content.html)


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_content(
    content_create: Content,
    super_user=Depends(get_current_active_super_user)
):
    content = content_crud.create_content(content_create)
    return {"content_id": content.id}
