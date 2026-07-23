from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.expense_service import (
    create_expense,delete_expense,
    get_all_expenses,get_expense_by_id, update_expense
)


@jwt_required()
def add_expense():
    data = request.get_json()

    required_fields = [
        "description",
        "amount",
        "category",
        "expense_date"
    ]

    for field in required_fields:
        if field not in data or data[field] in [None, ""]:
            return jsonify({
                "success": False,
                "message": f"{field} is required"
            }), 400

    user_id = get_jwt_identity()

    result = create_expense(
        user_id=user_id,
        description=data["description"],
        amount=data["amount"],
        category=data["category"],
        expense_date=data["expense_date"]
    )

    return jsonify(result), 201

@jwt_required()
def get_expenses():
    user_id = get_jwt_identity()

    result = get_all_expenses(user_id)

    return jsonify(result), 200

@jwt_required()
def get_expense(expense_id):
    user_id = get_jwt_identity()

    result = get_expense_by_id(user_id, expense_id)

    if result["success"]:
        return jsonify(result), 200

    return jsonify(result), 404


@jwt_required()
def edit_expense(expense_id):
    data = request.get_json()

    required_fields = [
        "description",
        "amount",
        "category",
        "expense_date"
    ]

    for field in required_fields:
        if field not in data or data[field] in [None, ""]:
            return jsonify({
                "success": False,
                "message": f"{field} is required"
            }), 400

    user_id = get_jwt_identity()

    result = update_expense(
        user_id=user_id,
        expense_id=expense_id,
        description=data["description"],
        amount=data["amount"],
        category=data["category"],
        expense_date=data["expense_date"]
    )

    if result["success"]:
        return jsonify(result), 200

    return jsonify(result), 404

@jwt_required()
def remove_expense(expense_id):
    user_id = get_jwt_identity()

    result = delete_expense(user_id, expense_id)

    if result["success"]:
        return jsonify(result), 200

    return jsonify(result), 404