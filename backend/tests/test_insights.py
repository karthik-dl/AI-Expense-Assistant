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


def test_spending_insights_no_expenses(client, auth_headers):

    response = client.get(
        "/api/insights",
        headers=auth_headers
    )

    assert response.status_code == 404

    data = response.get_json()

    assert data["success"] is False
    assert "No expenses found" in data["message"]


def test_spending_insights_single_expense(client, auth_headers):

    create_expense(
        client,
        auth_headers,
        "Lunch",
        500,
        "Food",
        "2026-07-01"
    )

    response = client.get(
        "/api/insights",
        headers=auth_headers
    )

    assert response.status_code == 200

    insights = response.get_json()["data"]

    assert insights["total_expenses"] == 500
    assert insights["total_transactions"] == 1
    assert insights["average_expense"] == 500
    assert insights["largest_expense"]["description"] == "Lunch"
    assert insights["largest_expense"]["amount"] == 500
    assert insights["top_category"]["category"] == "Food"
    assert insights["top_category"]["amount"] == 500


def test_spending_insights_multiple_expenses(client, auth_headers):

    create_expense(
        client,
        auth_headers,
        "Lunch",
        500,
        "Food",
        "2026-07-01"
    )

    create_expense(
        client,
        auth_headers,
        "Fuel",
        2000,
        "Transport",
        "2026-07-02"
    )

    create_expense(
        client,
        auth_headers,
        "Dinner",
        1000,
        "Food",
        "2026-07-03"
    )

    response = client.get(
        "/api/insights",
        headers=auth_headers
    )

    assert response.status_code == 200

    insights = response.get_json()["data"]

    assert insights["total_expenses"] == 3500
    assert insights["total_transactions"] == 3
    assert insights["average_expense"] == round(3500 / 3, 2)

    assert insights["largest_expense"]["description"] == "Fuel"
    assert insights["largest_expense"]["amount"] == 2000
    assert insights["largest_expense"]["category"] == "Transport"

    assert insights["top_category"]["category"] == "Transport"
    assert insights["top_category"]["amount"] == 2000


def test_spending_insights_largest_expense(client, auth_headers):

    create_expense(
        client,
        auth_headers,
        "Coffee",
        200,
        "Food",
        "2026-07-01"
    )

    create_expense(
        client,
        auth_headers,
        "Laptop",
        65000,
        "Shopping",
        "2026-07-05"
    )

    response = client.get(
        "/api/insights",
        headers=auth_headers
    )

    assert response.status_code == 200

    largest = response.get_json()["data"]["largest_expense"]

    assert largest["description"] == "Laptop"
    assert largest["amount"] == 65000
    assert largest["category"] == "Shopping"


def test_spending_insights_top_category(client, auth_headers):

    create_expense(
        client,
        auth_headers,
        "Breakfast",
        300,
        "Food",
        "2026-07-01"
    )

    create_expense(
        client,
        auth_headers,
        "Lunch",
        400,
        "Food",
        "2026-07-02"
    )

    create_expense(
        client,
        auth_headers,
        "Fuel",
        500,
        "Transport",
        "2026-07-03"
    )

    response = client.get(
        "/api/insights",
        headers=auth_headers
    )

    assert response.status_code == 200

    top = response.get_json()["data"]["top_category"]

    assert top["category"] == "Food"
    assert top["amount"] == 700


def test_spending_insights_without_token(client):

    response = client.get("/api/insights")

    assert response.status_code == 401