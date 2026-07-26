def test_add_budget_success(client, auth_headers):
    response = client.post(
        "/api/budgets",
        headers=auth_headers,
        json={
            "category": "Food",
            "amount": 10000,
            "month": 7,
            "year": 2026
        }
    )

    assert response.status_code == 201

    data = response.get_json()

    assert data["success"] is True


def test_add_budget_without_token(client):
    response = client.post(
        "/api/budgets",
        json={
            "category": "Food",
            "amount": 10000,
            "month": 7,
            "year": 2026
        }
    )

    assert response.status_code == 401


def test_get_all_budgets(client, auth_headers):
    client.post(
        "/api/budgets",
        headers=auth_headers,
        json={
            "category": "Food",
            "amount": 10000,
            "month": 7,
            "year": 2026
        }
    )

    response = client.get(
        "/api/budgets",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True


def test_get_budget_by_id(client, auth_headers):
    response = client.post(
        "/api/budgets",
        headers=auth_headers,
        json={
            "category": "Food",
            "amount": 10000,
            "month": 7,
            "year": 2026
        }
    )

    budget_id = response.get_json()["data"]["id"]

    response = client.get(
        f"/api/budgets/{budget_id}",
        headers=auth_headers
    )

    assert response.status_code == 200

    assert response.get_json()["success"] is True


def test_update_budget(client, auth_headers):
    response = client.post(
        "/api/budgets",
        headers=auth_headers,
        json={
            "category": "Food",
            "amount": 10000,
            "month": 7,
            "year": 2026
        }
    )

    budget_id = response.get_json()["data"]["id"]

    response = client.put(
        f"/api/budgets/{budget_id}",
        headers=auth_headers,
        json={
            "category": "Food",
            "amount": 12000,
            "month": 7,
            "year": 2026
        }
    )

    assert response.status_code == 200

    assert response.get_json()["success"] is True


def test_delete_budget(client, auth_headers):
    response = client.post(
        "/api/budgets",
        headers=auth_headers,
        json={
            "category": "Food",
            "amount": 10000,
            "month": 7,
            "year": 2026
        }
    )

    budget_id = response.get_json()["data"]["id"]

    response = client.delete(
        f"/api/budgets/{budget_id}",
        headers=auth_headers
    )

    assert response.status_code == 200

    assert response.get_json()["success"] is True


def test_remaining_budget(client, auth_headers):
    client.post(
        "/api/budgets",
        headers=auth_headers,
        json={
            "category": "Food",
            "amount": 10000,
            "month": 7,
            "year": 2026
        }
    )

    response = client.get(
        "/api/budgets/remaining?month=7&year=2026",
        headers=auth_headers
    )

    assert response.status_code == 200

    assert response.get_json()["success"] is True


def test_budget_utilization(client, auth_headers):
    client.post(
        "/api/budgets",
        headers=auth_headers,
        json={
            "category": "Food",
            "amount": 10000,
            "month": 7,
            "year": 2026
        }
    )

    response = client.get(
        "/api/budgets/utilization?month=7&year=2026",
        headers=auth_headers
    )

    assert response.status_code == 200

    assert response.get_json()["success"] is True


def test_get_invalid_budget(client, auth_headers):
    response = client.get(
        "/api/budgets/999",
        headers=auth_headers
    )

    assert response.status_code == 404


def test_add_invalid_budget(client, auth_headers):
    response = client.post(
        "/api/budgets",
        headers=auth_headers,
        json={
            "category": "",
            "amount": "",
            "month": "",
            "year": ""
        }
    )

    assert response.status_code == 400