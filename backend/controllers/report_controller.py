from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from services.report_service import (
    get_monthly_report,
    get_yearly_report,
    get_category_analysis,
    get_cash_flow,
    get_top_expenses,
    get_savings_analysis
)


@jwt_required()
def monthly_report():

    month = request.args.get("month", type=int)
    year = request.args.get("year", type=int)

    if not month or not year:
        return jsonify({
            "success": False,
            "message": "month and year are required"
        }), 400

    user_id = get_jwt_identity()

    result = get_monthly_report(user_id, month, year)

    return jsonify(result), 200


@jwt_required()
def yearly_report():

    year = request.args.get("year", type=int)

    if not year:
        return jsonify({
            "success": False,
            "message": "year is required"
        }), 400

    user_id = get_jwt_identity()

    result = get_yearly_report(user_id, year)

    return jsonify(result), 200


@jwt_required()
def category_analysis():

    month = request.args.get("month", type=int)
    year = request.args.get("year", type=int)

    if not month or not year:
        return jsonify({
            "success": False,
            "message": "month and year are required"
        }), 400

    user_id = get_jwt_identity()

    result = get_category_analysis(user_id, month, year)

    return jsonify(result), 200


@jwt_required()
def cash_flow():

    year = request.args.get("year", type=int)

    if not year:
        return jsonify({
            "success": False,
            "message": "year is required"
        }), 400

    user_id = get_jwt_identity()

    result = get_cash_flow(user_id, year)

    return jsonify(result), 200


@jwt_required()
def top_expenses():

    limit = request.args.get("limit", default=5, type=int)

    user_id = get_jwt_identity()

    result = get_top_expenses(user_id, limit)

    return jsonify(result), 200


@jwt_required()
def savings_analysis():

    year = request.args.get("year", type=int)

    if not year:
        return jsonify({
            "success": False,
            "message": "year is required"
        }), 400

    user_id = get_jwt_identity()

    result = get_savings_analysis(user_id, year)

    return jsonify(result), 200