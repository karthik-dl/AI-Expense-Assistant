from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.income_service import (
    create_income,
    get_all_incomes,
    get_income_by_id,
    update_income,
    delete_income,
    get_total_income,
    get_income_by_category
)


@jwt_required()
def add_income():
    data = request.get_json()

    required_fields = [
        "source",
        "category",
        "amount",
        "income_date"
    ]

    for field in required_fields:
        if field not in data or data[field] in [None, ""]:
            return jsonify({
                "success": False,
                "message": f"{field} is required"
            }), 400

    user_id = get_jwt_identity()

    result = create_income(
        user_id=user_id,
        source=data["source"],
        category=data["category"],
        amount=data["amount"],
        income_date=data["income_date"],
        notes=data.get("notes")
    )

    return jsonify(result), 201


@jwt_required()
def get_incomes():
    user_id = get_jwt_identity()

    result = get_all_incomes(user_id)

    return jsonify(result), 200


@jwt_required()
def get_income(income_id):
    user_id = get_jwt_identity()

    result = get_income_by_id(user_id, income_id)

    if result["success"]:
        return jsonify(result), 200

    return jsonify(result), 404


@jwt_required()
def edit_income(income_id):
    data = request.get_json()

    required_fields = [
        "source",
        "category",
        "amount",
        "income_date"
    ]

    for field in required_fields:
        if field not in data or data[field] in [None, ""]:
            return jsonify({
                "success": False,
                "message": f"{field} is required"
            }), 400

    user_id = get_jwt_identity()

    result = update_income(
        user_id=user_id,
        income_id=income_id,
        source=data["source"],
        category=data["category"],
        amount=data["amount"],
        income_date=data["income_date"],
        notes=data.get("notes")
    )

    if result["success"]:
        return jsonify(result), 200

    return jsonify(result), 404


@jwt_required()
def remove_income(income_id):
    user_id = get_jwt_identity()

    result = delete_income(user_id, income_id)

    if result["success"]:
        return jsonify(result), 200

    return jsonify(result), 404


@jwt_required()
def total_income():
    user_id = get_jwt_identity()

    result = get_total_income(user_id)

    return jsonify(result), 200


@jwt_required()
def income_category_summary():
    user_id = get_jwt_identity()

    result = get_income_by_category(user_id)

    return jsonify(result), 200