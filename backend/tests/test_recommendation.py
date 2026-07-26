def create_budget(client, auth_headers, category, amount):
    return client.post(
        "/api/budgets",
        headers=auth_headers,
        json={
            "category": category,
            "amount": amount,
            "month": 7,
            "year": 2026
        }
    )


def create_expense(client, auth_headers, description, amount, category, date):
    return client.post(
        "/api/expenses",
        headers=auth_headers,
        json={
            "description": description,
            "amount": amount,
            "category": category,
            "expense_date": date
        }
    )


def test_recommendation_no_budget(client, auth_headers):

    response = client.get(
        "/api/recommendations",
        headers=auth_headers
    )

    assert response.status_code == 404

    data = response.get_json()

    assert data["success"] is False
    assert "No budgets found" in data["message"]


def test_recommendation_good(client, auth_headers):

    create_budget(
        client,
        auth_headers,
        "Food",
        10000
    )

    create_expense(
        client,
        auth_headers,
        "Lunch",
        3000,
        "Food",
        "2026-07-01"
    )

    response = client.get(
        "/api/recommendations",
        headers=auth_headers
    )

    assert response.status_code == 200

    rec = response.get_json()["data"][0]

    assert rec["category"] == "Food"
    assert rec["budget"] == 10000
    assert rec["spent"] == 3000
    assert rec["remaining"] == 7000
    assert rec["status"] == "Good"


def test_recommendation_warning(client, auth_headers):

    create_budget(
        client,
        auth_headers,
        "Shopping",
        10000
    )

    create_expense(
        client,
        auth_headers,
        "Shoes",
        8500,
        "Shopping",
        "2026-07-10"
    )

    response = client.get(
        "/api/recommendations",
        headers=auth_headers
    )

    assert response.status_code == 200

    rec = response.get_json()["data"][0]

    assert rec["status"] == "Warning"
    assert rec["spent"] == 8500
    assert rec["remaining"] == 1500


def test_recommendation_exceeded(client, auth_headers):

    create_budget(
        client,
        auth_headers,
        "Travel",
        10000
    )

    create_expense(
        client,
        auth_headers,
        "Trip",
        12000,
        "Travel",
        "2026-07-15"
    )

    response = client.get(
        "/api/recommendations",
        headers=auth_headers
    )

    assert response.status_code == 200

    rec = response.get_json()["data"][0]

    assert rec["status"] == "Exceeded"
    assert rec["spent"] == 12000
    assert rec["remaining"] == 0


def test_recommendation_multiple_categories(client, auth_headers):

    create_budget(
        client,
        auth_headers,
        "Food",
        10000
    )

    create_budget(
        client,
        auth_headers,
        "Transport",
        5000
    )

    create_expense(
        client,
        auth_headers,
        "Lunch",
        4000,
        "Food",
        "2026-07-01"
    )

    create_expense(
        client,
        auth_headers,
        "Fuel",
        4500,
        "Transport",
        "2026-07-02"
    )

    response = client.get(
        "/api/recommendations",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()["data"]

    assert len(data) == 2

    statuses = {item["category"]: item["status"] for item in data}

    assert statuses["Food"] == "Good"
    assert statuses["Transport"] == "Warning"


def test_recommendation_without_token(client):

    response = client.get("/api/recommendations")

    assert response.status_code == 401