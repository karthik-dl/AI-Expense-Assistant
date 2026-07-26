def test_add_expense_success(client, auth_headers):

    response = client.post(
        "/api/expenses",
        headers=auth_headers,
        json={
            "description": "Lunch",
            "amount": 250,
            "category": "Food",
            "expense_date": "2026-07-25"
        }
    )

    assert response.status_code == 201

    data = response.get_json()

    assert data["success"] is True
    
def test_add_expense_without_token(client):

    response = client.post(
        "/api/expenses",
        json={
            "description": "Lunch",
            "amount": 250,
            "category": "Food",
            "expense_date": "2026-07-25"
        }
    )

    assert response.status_code == 401
    
def test_get_all_expenses(client, auth_headers):
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
        "/api/expenses",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True
    
def test_get_expense_by_id(client, auth_headers):
    response = client.post(
        "/api/expenses",
        headers=auth_headers,
        json={
            "description": "Coffee",
            "amount": 150,
            "category": "Food",
            "expense_date": "2026-07-25"
        }
    )

    expense_id = response.get_json()["data"]["id"]

    response = client.get(
        f"/api/expenses/{expense_id}",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True
    
def test_update_expense(client, auth_headers):
    response = client.post(
        "/api/expenses",
        headers=auth_headers,
        json={
            "description": "Lunch",
            "amount": 250,
            "category": "Food",
            "expense_date": "2026-07-25"
        }
    )

    expense_id = response.get_json()["data"]["id"]

    response = client.put(
        f"/api/expenses/{expense_id}",
        headers=auth_headers,
        json={
            "description": "Dinner",
            "amount": 500,
            "category": "Food",
            "expense_date": "2026-07-26"
        }
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True
    
def test_delete_expense(client, auth_headers):
    response = client.post(
        "/api/expenses",
        headers=auth_headers,
        json={
            "description": "Movie",
            "amount": 400,
            "category": "Entertainment",
            "expense_date": "2026-07-25"
        }
    )

    expense_id = response.get_json()["data"]["id"]

    response = client.delete(
        f"/api/expenses/{expense_id}",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True
    
def test_get_invalid_expense(client, auth_headers):
    response = client.get(
        "/api/expenses/999",
        headers=auth_headers
    )

    assert response.status_code == 404
    
def test_add_invalid_expense(client, auth_headers):
    response = client.post(
        "/api/expenses",
        headers=auth_headers,
        json={
            "description": "",
            "amount": "",
            "expense_date": ""
        }
    )

    assert response.status_code == 400