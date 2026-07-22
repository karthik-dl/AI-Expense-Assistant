from flask import request, jsonify
from database import db
from models.budget import Budget


def get_budget():
    budgets = Budget.query.all()

    data = []

    for budget in budgets:
        data.append({
            "id": budget.id,
            "monthly_budget": budget.monthly_budget,
            "month": budget.month,
            "year": budget.year,
            "user_id": budget.user_id
        })

    return jsonify(data), 200


def create_budget():
    data = request.get_json()

    budget = Budget(
        monthly_budget=data["monthly_budget"],
        month=data["month"],
        year=data["year"],
        user_id=data["user_id"]
    )

    db.session.add(budget)
    db.session.commit()

    return jsonify({
        "message": "Budget created successfully"
    }), 201