from flask import request, jsonify
from database import db
from models.expense import Expense


def get_expenses():
    expenses = Expense.query.all()

    data = []

    for expense in expenses:
        data.append({
            "id": expense.id,
            "description": expense.description,
            "amount": expense.amount,
            "category": expense.category,
            "expense_date": str(expense.expense_date),
            "user_id": expense.user_id
        })

    return jsonify(data), 200


def create_expense():
    data = request.get_json()

    expense = Expense(
        description=data["description"],
        amount=data["amount"],
        category=data["category"],
        expense_date=data["expense_date"],
        user_id=data["user_id"]
    )

    db.session.add(expense)
    db.session.commit()

    return jsonify({
        "message": "Expense added successfully"
    }), 201