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


def create_expense(client, auth_headers, amount, date, category="Food"):
    return client.post(
        "/api/expenses",
        headers=auth_headers,
        json={
            "description": "Expense",
            "amount": amount,
            "category": category,
            "expense_date": date
        }
    )


def test_monthly_analytics_empty(client, auth_headers):

    response = client.get(
        "/api/analytics",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True
    assert len(data["data"]) == 12

    january = data["data"][0]

    assert january["income"] == 0
    assert january["expense"] == 0
    assert january["savings"] == 0


def test_monthly_analytics_single_month(client, auth_headers):

    create_income(
        client,
        auth_headers,
        50000,
        "2026-07-10"
    )

    create_expense(
        client,
        auth_headers,
        12000,
        "2026-07-15",
        "Food"
    )

    response = client.get(
        "/api/analytics",
        headers=auth_headers
    )

    assert response.status_code == 200

    july = response.get_json()["data"][6]

    assert july["month"] == "July"
    assert july["income"] == 50000
    assert july["expense"] == 12000
    assert july["savings"] == 38000


def test_monthly_analytics_multiple_months(client, auth_headers):

    create_income(
        client,
        auth_headers,
        30000,
        "2026-01-05"
    )

    create_income(
        client,
        auth_headers,
        40000,
        "2026-02-05"
    )

    create_expense(
        client,
        auth_headers,
        10000,
        "2026-01-15"
    )

    create_expense(
        client,
        auth_headers,
        15000,
        "2026-02-20"
    )

    response = client.get(
        "/api/analytics",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()["data"]

    january = data[0]
    february = data[1]

    assert january["income"] == 30000
    assert january["expense"] == 10000
    assert january["savings"] == 20000

    assert february["income"] == 40000
    assert february["expense"] == 15000
    assert february["savings"] == 25000


def test_monthly_analytics_expense_only(client, auth_headers):

    create_expense(
        client,
        auth_headers,
        5000,
        "2026-05-10"
    )

    response = client.get(
        "/api/analytics",
        headers=auth_headers
    )

    assert response.status_code == 200

    may = response.get_json()["data"][4]

    assert may["income"] == 0
    assert may["expense"] == 5000
    assert may["savings"] == -5000


def test_monthly_analytics_income_only(client, auth_headers):

    create_income(
        client,
        auth_headers,
        25000,
        "2026-03-08"
    )

    response = client.get(
        "/api/analytics",
        headers=auth_headers
    )

    assert response.status_code == 200

    march = response.get_json()["data"][2]

    assert march["income"] == 25000
    assert march["expense"] == 0
    assert march["savings"] == 25000


def test_monthly_analytics_without_token(client):

    response = client.get("/api/analytics")

    assert response.status_code == 401