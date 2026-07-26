def test_filter_expense_by_category(client, auth_headers):

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

    client.post(
        "/api/expenses",
        headers=auth_headers,
        json={
            "description": "Bus Ticket",
            "amount": 120,
            "category": "Travel",
            "expense_date": "2026-07-25"
        }
    )

    response = client.get(
        "/api/expenses?category=Food",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True

    expenses = data["data"]["expenses"]

    assert len(expenses) >= 1

    assert expenses[0]["category"] == "Food"


def test_search_expense(client, auth_headers):

    client.post(
        "/api/expenses",
        headers=auth_headers,
        json={
            "description": "Movie Ticket",
            "amount": 450,
            "category": "Entertainment",
            "expense_date": "2026-07-25"
        }
    )

    response = client.get(
        "/api/expenses?search=Movie",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True


def test_filter_by_amount(client, auth_headers):

    client.post(
        "/api/expenses",
        headers=auth_headers,
        json={
            "description": "Laptop Bag",
            "amount": 1500,
            "category": "Shopping",
            "expense_date": "2026-07-25"
        }
    )

    response = client.get(
        "/api/expenses?min_amount=1000&max_amount=2000",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True


def test_filter_by_date(client, auth_headers):

    client.post(
        "/api/expenses",
        headers=auth_headers,
        json={
            "description": "Electricity Bill",
            "amount": 800,
            "category": "Bills",
            "expense_date": "2026-07-20"
        }
    )

    response = client.get(
        "/api/expenses?start_date=2026-07-01&end_date=2026-07-31",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True


def test_filter_by_month_year(client, auth_headers):

    response = client.get(
        "/api/expenses?month=7&year=2026",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True


def test_sort_by_amount(client, auth_headers):

    response = client.get(
        "/api/expenses?sort=amount",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True


def test_sort_by_category(client, auth_headers):

    response = client.get(
        "/api/expenses?sort=category",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True


def test_update_invalid_expense(client, auth_headers):

    response = client.put(
        "/api/expenses/9999",
        headers=auth_headers,
        json={
            "description": "Updated Expense",
            "amount": 100,
            "category": "Food",
            "expense_date": "2026-07-25"
        }
    )

    assert response.status_code == 404

    data = response.get_json()

    assert data["success"] is False


def test_delete_invalid_expense(client, auth_headers):

    response = client.delete(
        "/api/expenses/9999",
        headers=auth_headers
    )

    assert response.status_code == 404

    data = response.get_json()

    assert data["success"] is False