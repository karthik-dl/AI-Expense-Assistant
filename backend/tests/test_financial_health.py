def create_income(client, auth_headers, amount):
    return client.post(
        "/api/incomes",
        headers=auth_headers,
        json={
            "source": "Salary",
            "category": "Job",
            "amount": amount,
            "income_date": "2026-07-25",
            "notes": "Monthly Salary"
        }
    )


def create_expense(client, auth_headers, amount, category="Food"):
    return client.post(
        "/api/expenses",
        headers=auth_headers,
        json={
            "description": "Expense",
            "amount": amount,
            "category": category,
            "expense_date": "2026-07-25"
        }
    )


def test_financial_health_success(client, auth_headers):

    create_income(client, auth_headers, 50000)
    create_expense(client, auth_headers, 10000, "Housing")

    response = client.get(
        "/api/financial-health",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True
    assert data["data"]["score"] == 100
    assert data["data"]["status"] == "Excellent"
    assert data["data"]["income"] == 50000
    assert data["data"]["expense"] == 10000


def test_financial_health_no_income(client, auth_headers):

    create_expense(client, auth_headers, 500, "Food")

    response = client.get(
        "/api/financial-health",
        headers=auth_headers
    )

    assert response.status_code == 404

    data = response.get_json()

    assert data["success"] is False


def test_financial_health_without_token(client):

    response = client.get("/api/financial-health")

    assert response.status_code == 401


def test_financial_health_excellent(client, auth_headers):

    create_income(client, auth_headers, 100000)
    create_expense(client, auth_headers, 10000, "Food")

    response = client.get(
        "/api/financial-health",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True
    assert data["data"]["score"] == 100
    assert data["data"]["status"] == "Excellent"


def test_financial_health_average_or_good(client, auth_headers):

    create_income(client, auth_headers, 30000)
    create_expense(client, auth_headers, 20000, "Shopping")

    response = client.get(
        "/api/financial-health",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True
    assert data["data"]["score"] == 90
    assert data["data"]["status"] == "Excellent"


def test_financial_health_poor(client, auth_headers):

    create_income(client, auth_headers, 10000)
    create_expense(client, auth_headers, 15000, "Transport")

    response = client.get(
        "/api/financial-health",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True
    assert data["data"]["score"] == 50
    assert data["data"]["status"] == "Average"