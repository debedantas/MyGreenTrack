from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from model.tips import M_Tip
from crud.base_crud import CRUDRepository


class TipRepository(CRUDRepository):
    def find_all(
        self,
        db: Session,
        offset: int = 0,
        limit: int = 100,
        order_by: str = "creation_date",
        order_direction: str = "desc"
    ) -> List[M_Tip]:
        """Get paginated tips with ordering"""
        query = db.query(M_Tip)

        # Handle ordering
        order_column = getattr(M_Tip, order_by, None)
        if order_column:
            if order_direction.lower() == "desc":
                query = query.order_by(desc(order_column))
            else:
                query = query.order_by(order_column)

        return query.offset(offset).limit(limit).all()

    def count(self, db: Session) -> int:
        """Get total number of tips"""
        return db.query(func.count(M_Tip.id)).scalar()

    def find_by_id(self, db: Session, id: int) -> Optional[M_Tip]:
        """Get single tip by ID"""
        return db.query(M_Tip).filter(M_Tip.id == id).first()

    def get_paginated_tips(
        self,
        db: Session,
        page: int = 0,
        base_limit: int = 3,
        subsequent_limit: int = 6
    ) -> dict:
        """Custom pagination implementation with:
        - page 0: first 4 items
        - subsequent pages: 6 items each
        """
        page = max(page, 0)

        # Calculate limits and offsets
        if page == 0:
            limit = base_limit
            offset = 0
        else:
            limit = subsequent_limit
            offset = base_limit + (page - 1) * subsequent_limit

        # Get paginated results
        items = self.find_all(db, offset=offset, limit=limit)

        # Get total count
        total_items = self.count(db)

        # Calculate total pages based on custom logic
        if total_items <= base_limit:
            total_pages = 1 if total_items > 0 else 0
        else:
            remaining = total_items - base_limit
            total_pages = 1 + \
                (remaining + subsequent_limit - 1) // subsequent_limit

        return {
            "items": items,
            "total_items": total_items,
            "total_pages": total_pages - 1,
            "current_page": page,
        }


tip_repository = TipRepository(model=M_Tip)
