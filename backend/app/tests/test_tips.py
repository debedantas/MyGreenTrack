import pytest
from unittest.mock import MagicMock
from sqlalchemy.orm import Session
from model.tips import M_Tip
from schemas.tips import Tip
from crud.tips import TipRepository


@pytest.fixture
def mock_db():
    return MagicMock(spec=Session)


@pytest.fixture
def tip_repository():
    return TipRepository(model=M_Tip)


def test_find_all(mock_db, tip_repository):
    mock_db.query().all.return_value = [M_Tip(id=1, title="Grama é verde e o céu é azul")]
    tips = tip_repository.find_all(mock_db)
    assert len(tips) == 1
    assert tips[0].title == "Grama é verde e o céu é azul"


def test_find_by_id(mock_db, tip_repository):
    mock_db.query().filter().first.return_value = M_Tip(id=1, title="Grama é verde e o céu é azul")
    tip = tip_repository.find_by_id(mock_db, 1)
    assert tip is not None
    assert tip.id == 1


def test_create_tip(mock_db, tip_repository):
    tip = Tip(id = 1, title = "Grama é verde e o céu é azul",
               author_name = "Joãozinho", category = "Natureza",
               creation_date = "2021-09-01",
               summary = "A grama é verde e o céu é azul...",
               content_id = 2)
    mock_db.query().filter().first.return_value = tip
    created_tip = tip_repository.create(mock_db, tip)
    assert created_tip is not None
    assert created_tip.id == 1


def test_create_tip_fail(mock_db, tip_repository):
    tip = Tip(id=1, title="Grama é verde e o céu é azul",
              author_name="Joãozinho", category="Natureza",
              creation_date="2021-09-01",
              summary="A grama é verde e o céu é azul...",
              content_id=2)
    mock_db.query().filter().first.return_value = tip
    mock_db.add.side_effect = Exception("Failed to create tip")
    with pytest.raises(Exception, match="Failed to create tip"):
        tip_repository.create(mock_db, tip)

