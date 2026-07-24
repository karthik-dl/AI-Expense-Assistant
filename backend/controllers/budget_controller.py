from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.budget_service import (
    create_budget,
    get_all_budgets,
    get_budget_by_id,
    update_budget,
    delete_budget,
    get_remaining_budget,
    get_budget_utilization
)


@jwt_required()
def add_budget():
    data = request.get_json()

    required_fields = [
        "category",
        "amount",
        "month",
        "year"
    ]

    for field in required_fields:
        if field not in data or data[field] in [None, ""]:
            return jsonify({
                "success": False,
                "message": f"{field} is required"
            }), 400

    user_id = get_jwt_identity()

    result = create_budget(
        user_id=user_id,
        category=data["category"],
        amount=data["amount"],
        month=data["month"],
        year=data["year"]
    )

    if result["success"]:
        return jsonify(result), 201

    return jsonify(result), 400


@jwt_required()
def get_budgets():
    user_id = get_jwt_identity()

    result = get_all_budgets(user_id)

    return jsonify(result), 200


@jwt_required()
def get_budget(budget_id):
    user_id = get_jwt_identity()

    result = get_budget_by_id(user_id, budget_id)

    if result["success"]:
        return jsonify(result), 200

    return jsonify(result), 404


@jwt_required()
def edit_budget(budget_id):
    data = request.get_json()

    required_fields = [
        "category",
        "amount",
        "month",
        "year"
    ]

    for field in required_fields:
        if field not in data or data[field] in [None, ""]:
            return jsonify({
                "success": False,
                "message": f"{field} is required"
            }), 400

    user_id = get_jwt_identity()

    result = update_budget(
        user_id=user_id,
        budget_id=budget_id,
        category=data["category"],
        amount=data["amount"],
        month=data["month"],
        year=data["year"]
    )

    if result["success"]:
        return jsonify(result), 200

    return jsonify(result), 404


@jwt_required()
def remove_budget(budget_id):
    user_id = get_jwt_identity()

    result = delete_budget(user_id, budget_id)

    if result["success"]:
        return jsonify(result), 200

    return jsonify(result), 404


@jwt_required()
def remaining_budget():
    month = request.args.get("month", type=int)
    year = request.args.get("year", type=int)

    if not month or not year:
        return jsonify({
            "success": False,
            "message": "month and year are required"
        }), 400

    user_id = get_jwt_identity()

    result = get_remaining_budget(
        user_id=user_id,
        month=month,
        year=year
    )

    return jsonify(result), 200


@jwt_required()
def budget_utilization():
    month = request.args.get("month", type=int)
    year = request.args.get("year", type=int)

    if not month or not year:
        return jsonify({
            "success": False,
            "message": "month and year are required"
        }), 400

    user_id = get_jwt_identity()

    result = get_budget_utilization(
        user_id=user_id,
        month=month,
        year=year
    )

    return jsonify(result), 200