import json


def test_get_users(client):
    register_data = {
        "name": "Karthik",
        "email": "karthik@test.com",
        "password": "Password123"
    }

    client.post(
        "/api/auth/register",
        json=register_data
    )

    response = client.get("/api/users")

    assert response.status_code == 200

    data = response.get_json()

    assert len(data) == 1
    assert data[0]["name"] == "Karthik"
    assert data[0]["email"] == "karthik@test.com"


def test_create_user(client):

    payload = {
        "name": "Rahul",
        "email": "rahul@test.com",
        "password": "Password123"
    }

    response = client.post(
        "/api/users",
        json=payload
    )

    assert response.status_code == 201

    data = response.get_json()

    assert data["message"] == "User created successfully"


def test_multiple_users(client):

    users = [
        {
            "name": "User1",
            "email": "u1@test.com",
            "password": "Password123"
        },
        {
            "name": "User2",
            "email": "u2@test.com",
            "password": "Password123"
        }
    ]

    for user in users:
        client.post("/api/users", json=user)

    response = client.get("/api/users")

    assert response.status_code == 200

    data = response.get_json()

    assert len(data) == 2


def test_create_user_missing_name(client):

    payload = {
        "email": "abc@test.com",
        "password": "Password123"
    }

    response = client.post(
        "/api/users",
        json=payload
    )

    assert response.status_code >= 400


def test_create_user_missing_email(client):

    payload = {
        "name": "Test",
        "password": "Password123"
    }

    response = client.post(
        "/api/users",
        json=payload
    )

    assert response.status_code >= 400


def test_create_user_missing_password(client):

    payload = {
        "name": "Test",
        "email": "abc@test.com"
    }

    response = client.post(
        "/api/users",
        json=payload
    )

    assert response.status_code >= 400