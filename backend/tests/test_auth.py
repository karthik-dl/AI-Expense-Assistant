def test_register_success(client):

    response = client.post(
        "/api/auth/register",
        json={
            "name": "Karthik",
            "email": "karthik@test.com",
            "password": "Password123"
        }
    )

    assert response.status_code == 201

    data = response.get_json()

    assert data["success"] is True


def test_register_missing_name(client):

    response = client.post(
        "/api/auth/register",
        json={
            "email": "karthik@test.com",
            "password": "Password123"
        }
    )

    assert response.status_code == 400

    data = response.get_json()

    assert data["success"] is False


def test_register_duplicate_email(client):

    payload = {
        "name": "Karthik",
        "email": "duplicate@test.com",
        "password": "Password123"
    }

    client.post("/api/auth/register", json=payload)

    response = client.post("/api/auth/register", json=payload)

    assert response.status_code == 409


def test_login_success(client):

    payload = {
        "name": "Karthik",
        "email": "login@test.com",
        "password": "Password123"
    }

    client.post("/api/auth/register", json=payload)

    response = client.post(
        "/api/auth/login",
        json={
            "email": "login@test.com",
            "password": "Password123"
        }
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True
    assert "access_token" in data
    assert data["user"]["email"] == "login@test.com"


def test_login_invalid_password(client):

    payload = {
        "name": "Karthik",
        "email": "wrong@test.com",
        "password": "Password123"
    }

    client.post("/api/auth/register", json=payload)

    response = client.post(
        "/api/auth/login",
        json={
            "email": "wrong@test.com",
            "password": "WrongPassword"
        }
    )

    assert response.status_code == 401

    data = response.get_json()

    assert data["success"] is False


def test_login_unknown_email(client):

    response = client.post(
        "/api/auth/login",
        json={
            "email": "nouser@test.com",
            "password": "Password123"
        }
    )

    assert response.status_code == 401

    data = response.get_json()

    assert data["success"] is False