def create_income(client, auth_headers, amount, date):
    return client.post(
        "/api/incomes",
        headers=auth_headers,
        json={
            "source": "Salary",
            "category": "Job",
            "amount": amount,
            "income_date": date,
            "notes": "Monthly Salary"
        }
    )


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


def test_ai_summary_success(client, auth_headers):

    create_income(client, auth_headers, 50000, "2026-07-01")

    create_budget(client, auth_headers, "Food", 10000)

    create_budget(client, auth_headers, "Travel", 5000)

    create_expense(
        client,
        auth_headers,
        "Lunch",
        3000,
        "Food",
        "2026-07-02"
    )

    create_expense(
        client,
        auth_headers,
        "Trip",
        6000,
        "Travel",
        "2026-07-03"
    )

    response = client.get(
        "/api/ai-summary",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()["data"]

    assert data["success"] is True
    assert "financial health score" in data["summary"].lower()
    assert "highest spending category" in data["summary"].lower()
    assert "average expense" in data["summary"].lower()
    assert "Travel" in data["summary"]

    assert data["health"]["score"] > 0
    assert len(data["recommendations"]) == 2


def test_ai_summary_without_income(client, auth_headers):

    response = client.get(
        "/api/ai-summary",
        headers=auth_headers
    )

    assert response.status_code == 404

    data = response.get_json()

    assert data["success"] is False


def test_ai_summary_without_expenses(client, auth_headers):

    create_income(client, auth_headers, 50000, "2026-07-01")

    response = client.get(
        "/api/ai-summary",
        headers=auth_headers
    )

    assert response.status_code == 404

    assert response.get_json()["success"] is False


def test_ai_summary_without_budget(client, auth_headers):

    create_income(client, auth_headers, 50000, "2026-07-01")

    create_expense(
        client,
        auth_headers,
        "Lunch",
        3000,
        "Food",
        "2026-07-02"
    )

    response = client.get(
        "/api/ai-summary",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()["data"]

    assert data["success"] is True
    assert data["recommendations"] == []


def test_ai_summary_all_budgets_good(client, auth_headers):

    create_income(client, auth_headers, 60000, "2026-07-01")

    create_budget(client, auth_headers, "Food", 10000)

    create_expense(
        client,
        auth_headers,
        "Lunch",
        3000,
        "Food",
        "2026-07-02"
    )

    response = client.get(
        "/api/ai-summary",
        headers=auth_headers
    )

    assert response.status_code == 200

    summary = response.get_json()["data"]["summary"]

    assert "within all budget limits" in summary.lower()


def test_ai_summary_without_token(client):

    response = client.get("/api/ai-summary")

    assert response.status_code == 401