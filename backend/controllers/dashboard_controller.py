from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.dashboard_service import (
    get_dashboard_summary,
    get_monthly_summary,
    get_category_expenses,
    get_recent_transactions
)


@jwt_required()
def dashboard_summary():
    user_id = get_jwt_identity()

    result = get_dashboard_summary(user_id)

    return jsonify(result), 200


@jwt_required()
def monthly_summary():
    user_id = get_jwt_identity()

    result = get_monthly_summary(user_id)

    return jsonify(result), 200


@jwt_required()
def category_expenses():
    user_id = get_jwt_identity()

    result = get_category_expenses(user_id)

    return jsonify(result), 200


@jwt_required()
def recent_transactions():
    user_id = get_jwt_identity()

    result = get_recent_transactions(user_id)

    return jsonify(result), 200