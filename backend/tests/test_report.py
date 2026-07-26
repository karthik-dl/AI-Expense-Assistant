def test_monthly_report(client, auth_headers):

    client.post(
        "/api/incomes",
        headers=auth_headers,
        json={
            "source": "Salary",
            "amount": 50000,
            "income_date": "2026-07-25"
        }
    )

    client.post(
        "/api/expenses",
        headers=auth_headers,
        json={
            "description": "Rent",
            "amount": 10000,
            "category": "Housing",
            "expense_date": "2026-07-25"
        }
    )

    response = client.get(
        "/api/reports/monthly?month=7&year=2026",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True


def test_monthly_report_missing_parameters(client, auth_headers):

    response = client.get(
        "/api/reports/monthly",
        headers=auth_headers
    )

    assert response.status_code == 400


def test_yearly_report(client, auth_headers):

    response = client.get(
        "/api/reports/yearly?year=2026",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True

    assert len(data["report"]) == 12


def test_yearly_report_missing_year(client, auth_headers):

    response = client.get(
        "/api/reports/yearly",
        headers=auth_headers
    )

    assert response.status_code == 400


def test_category_analysis(client, auth_headers):

    client.post(
        "/api/expenses",
        headers=auth_headers,
        json={
            "description": "Lunch",
            "amount": 250,
            "category": "Food",
            "expense_date": "2026-07-25"
        }
    )

    response = client.get(
        "/api/reports/category-analysis?month=7&year=2026",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True


def test_category_analysis_missing_parameters(client, auth_headers):

    response = client.get(
        "/api/reports/category-analysis",
        headers=auth_headers
    )

    assert response.status_code == 400


def test_cash_flow(client, auth_headers):

    response = client.get(
        "/api/reports/cash-flow?year=2026",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True

    assert len(data["cash_flow"]) == 12


def test_cash_flow_missing_year(client, auth_headers):

    response = client.get(
        "/api/reports/cash-flow",
        headers=auth_headers
    )

    assert response.status_code == 400


def test_top_expenses(client, auth_headers):

    client.post(
        "/api/expenses",
        headers=auth_headers,
        json={
            "description": "Laptop",
            "amount": 60000,
            "category": "Shopping",
            "expense_date": "2026-07-25"
        }
    )

    response = client.get(
        "/api/reports/top-expenses",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True


def test_savings_analysis(client, auth_headers):

    response = client.get(
        "/api/reports/savings-analysis?year=2026",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True

    assert len(data["savings"]) == 12


def test_savings_analysis_missing_year(client, auth_headers):

    response = client.get(
        "/api/reports/savings-analysis",
        headers=auth_headers
    )

    assert response.status_code == 400


def test_report_without_token(client):

    response = client.get("/api/reports/monthly?month=7&year=2026")

    assert response.status_code == 401