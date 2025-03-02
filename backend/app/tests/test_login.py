import pytest
from unittest.mock import MagicMock
from sqlalchemy.orm import Session
from model.user import User
from crud.user import UserRepository


@pytest.fixture
def mock_db():
    return MagicMock(spec=Session)


@pytest.fixture
def user_repository():
    return UserRepository(model=User)


def test_find_all(mock_db, user_repository):
    mock_db.query().all.return_value = [User(id=1, email="test@example.com")]
    users = user_repository.find_all(mock_db)
    assert len(users) == 1
    assert users[0].email == "test@example.com"


def test_find_by_email(mock_db, user_repository):
    mock_db.query().filter().first.return_value = User(id=1, email="test@example.com")
    user = user_repository.find_by_email(mock_db, "test@example.com")
    assert user is not None
    assert user.email == "test@example.com"


def test_authenticate_user_success(mock_db, user_repository, mocker):
    user = User(id=1, email="test@example.com",
                hashed_password="hashed_password")
    mock_db.query().filter().first.return_value = user
    mocker.patch("crud.user.verify_password", return_value=True)
    authenticated_user = user_repository.authenticate_user(
        mock_db, "test@example.com", "password")
    assert authenticated_user is not None
    assert authenticated_user.email == "test@example.com"


def test_authenticate_user_fail_email(mock_db, user_repository):
    mock_db.query().filter().first.return_value = None
    authenticated_user = user_repository.authenticate_user(
        mock_db, "wrong@example.com", "password")
    assert authenticated_user is None


def test_authenticate_user_fail_password(mock_db, user_repository, mocker):
    user = User(id=1, email="test@example.com",
                hashed_password="hashed_password")
    mock_db.query().filter().first.return_value = user
    mocker.patch("crud.user.verify_password", return_value=False)
    authenticated_user = user_repository.authenticate_user(
        mock_db, "test@example.com", "wrong_password")
    assert authenticated_user is None
