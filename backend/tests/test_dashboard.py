def test_dashboard_summary(client, auth_headers):
    response = client.get(
        "/api/dashboard/summary",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True
    assert "summary" in data


def test_monthly_summary(client, auth_headers):
    response = client.get(
        "/api/dashboard/monthly-summary",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True
    assert "monthly_summary" in data


def test_category_expenses(client, auth_headers):
    client.post(
        "/api/expenses",
        headers=auth_headers,
        json={
            "description": "Lunch",
            "category": "Food",
            "amount": 250,
            "expense_date": "2026-07-26",
            "payment_method": "Cash",
            "notes": "Test Expense"
        }
    )

    response = client.get(
        "/api/dashboard/category-expenses",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True
    assert "categories" in data


def test_recent_transactions(client, auth_headers):
    client.post(
        "/api/incomes",
        headers=auth_headers,
        json={
            "source": "Salary",
            "category": "Job",
            "amount": 50000,
            "income_date": "2026-07-26",
            "notes": "Salary"
        }
    )

    client.post(
        "/api/expenses",
        headers=auth_headers,
        json={
            "description": "Groceries",
            "category": "Food",
            "amount": 500,
            "expense_date": "2026-07-26",
            "payment_method": "UPI",
            "notes": "Shopping"
        }
    )

    response = client.get(
        "/api/dashboard/recent-transactions",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True
    assert "transactions" in data


def test_dashboard_summary_without_token(client):
    response = client.get("/api/dashboard/summary")

    assert response.status_code == 401


def test_monthly_summary_without_token(client):
    response = client.get("/api/dashboard/monthly-summary")

    assert response.status_code == 401


def test_category_expenses_without_token(client):
    response = client.get("/api/dashboard/category-expenses")

    assert response.status_code == 401


def test_recent_transactions_without_token(client):
    response = client.get("/api/dashboard/recent-transactions")

    assert response.status_code == 401