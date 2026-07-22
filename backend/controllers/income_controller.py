from flask import request, jsonify
from database import db
from models.income import Income


def get_incomes():
    incomes = Income.query.all()

    data = []

    for income in incomes:
        data.append({
            "id": income.id,
            "source": income.source,
            "amount": income.amount,
            "income_date": str(income.income_date),
            "user_id": income.user_id
        })

    return jsonify(data), 200


def create_income():
    data = request.get_json()

    income = Income(
        source=data["source"],
        amount=data["amount"],
        income_date=data["income_date"],
        user_id=data["user_id"]
    )

    db.session.add(income)
    db.session.commit()

    return jsonify({
        "message": "Income added successfully"
    }), 201