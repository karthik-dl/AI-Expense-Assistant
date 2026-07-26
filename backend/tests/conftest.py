import pytest

from app import create_app
from database import db
from test_config import TestConfig


@pytest.fixture
def app():
    app = create_app(TestConfig)

    with app.app_context():
        db.create_all()

        yield app

        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    return app.test_client()


@pytest.fixture
def auth_headers(client):
    register_data = {
        "name": "Karthik",
        "email": "karthik@test.com",
        "password": "Password123"
    }

    client.post("/api/auth/register", json=register_data)

    response = client.post(
        "/api/auth/login",
        json={
            "email": "karthik@test.com",
            "password": "Password123"
        }
    )

    token = response.get_json()["access_token"]

    return {
        "Authorization": f"Bearer {token}"
    }