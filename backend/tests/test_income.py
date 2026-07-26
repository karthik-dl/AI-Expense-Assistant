def test_add_income_success(client, auth_headers):
    response = client.post(
        "/api/incomes",
        headers=auth_headers,
        json={
            "source": "Salary",
            "category": "Job",
            "amount": 50000,
            "income_date": "2026-07-25",
            "notes": "Monthly Salary"
        }
    )

    assert response.status_code == 201

    data = response.get_json()

    assert data["success"] is True


def test_add_income_without_token(client):
    response = client.post(
        "/api/incomes",
        json={
            "source": "Salary",
            "category": "Job",
            "amount": 50000,
            "income_date": "2026-07-25",
            "notes": "Monthly Salary"
        }
    )

    assert response.status_code == 401


def test_get_all_incomes(client, auth_headers):
    client.post(
        "/api/incomes",
        headers=auth_headers,
        json={
            "source": "Salary",
            "category": "Job",
            "amount": 50000,
            "income_date": "2026-07-25",
            "notes": "Monthly Salary"
        }
    )

    response = client.get(
        "/api/incomes",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True


def test_get_income_by_id(client, auth_headers):
    response = client.post(
        "/api/incomes",
        headers=auth_headers,
        json={
            "source": "Salary",
            "category": "Job",
            "amount": 50000,
            "income_date": "2026-07-25",
            "notes": "Monthly Salary"
        }
    )

    income_id = response.get_json()["data"]["id"]

    response = client.get(
        f"/api/incomes/{income_id}",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True


def test_update_income(client, auth_headers):
    response = client.post(
        "/api/incomes",
        headers=auth_headers,
        json={
            "source": "Salary",
            "category": "Job",
            "amount": 50000,
            "income_date": "2026-07-25",
            "notes": "Monthly Salary"
        }
    )

    income_id = response.get_json()["data"]["id"]

    response = client.put(
        f"/api/incomes/{income_id}",
        headers=auth_headers,
        json={
            "source": "Freelance",
            "category": "Business",
            "amount": 60000,
            "income_date": "2026-07-26",
            "notes": "Updated Income"
        }
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True


def test_delete_income(client, auth_headers):
    response = client.post(
        "/api/incomes",
        headers=auth_headers,
        json={
            "source": "Salary",
            "category": "Job",
            "amount": 50000,
            "income_date": "2026-07-25",
            "notes": "Monthly Salary"
        }
    )

    income_id = response.get_json()["data"]["id"]

    response = client.delete(
        f"/api/incomes/{income_id}",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True


def test_get_total_income(client, auth_headers):
    client.post(
        "/api/incomes",
        headers=auth_headers,
        json={
            "source": "Salary",
            "category": "Job",
            "amount": 50000,
            "income_date": "2026-07-25",
            "notes": "Monthly Salary"
        }
    )

    response = client.get(
        "/api/incomes/total",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True


def test_income_category_summary(client, auth_headers):
    client.post(
        "/api/incomes",
        headers=auth_headers,
        json={
            "source": "Salary",
            "category": "Job",
            "amount": 50000,
            "income_date": "2026-07-25",
            "notes": "Monthly Salary"
        }
    )

    response = client.get(
        "/api/incomes/category-summary",
        headers=auth_headers
    )

    assert response.status_code == 200

    data = response.get_json()

    assert data["success"] is True


def test_get_invalid_income(client, auth_headers):
    response = client.get(
        "/api/incomes/999",
        headers=auth_headers
    )

    assert response.status_code == 404


def test_add_invalid_income(client, auth_headers):
    response = client.post(
        "/api/incomes",
        headers=auth_headers,
        json={
            "source": "",
            "category": "",
            "amount": "",
            "income_date": ""
        }
    )

    assert response.status_code == 400