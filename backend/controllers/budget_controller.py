from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity

from utils.validators import validate_budget
from utils.response import success_response, error_response
from utils.logger import logger

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

    errors = validate_budget(data)

    if errors:
        logger.warning("Budget validation failed")

        return error_response(
            "Validation failed",
            400,
            errors
        )

    user_id = get_jwt_identity()

    logger.info(f"User {user_id} is creating a budget")

    result = create_budget(
        user_id=user_id,
        category=data["category"],
        amount=data["amount"],
        month=data["month"],
        year=data["year"]
    )

    if result["success"]:
        logger.info(f"Budget created successfully by User {user_id}")

        return success_response(
            "Budget created successfully",
            result.get("budget"),
            201
        )

    logger.warning(f"Budget creation failed for User {user_id}")

    return error_response(
        result["message"],
        400
    )


@jwt_required()
def get_budgets():
    user_id = get_jwt_identity()

    logger.info(f"User {user_id} requested all budgets")

    result = get_all_budgets(user_id)

    if result["success"]:
        return success_response(
            "Budgets fetched successfully",
            result.get("budgets")
        )

    logger.warning(f"Failed to fetch budgets for User {user_id}")

    return error_response(
        result["message"],
        400
    )


@jwt_required()
def get_budget(budget_id):
    user_id = get_jwt_identity()

    logger.info(f"User {user_id} requested budget {budget_id}")

    result = get_budget_by_id(user_id, budget_id)

    if result["success"]:
        return success_response(
            "Budget fetched successfully",
            result.get("budget")
        )

    logger.warning(
        f"Budget {budget_id} not found for User {user_id}"
    )

    return error_response(
        result["message"],
        404
    )


@jwt_required()
def edit_budget(budget_id):
    data = request.get_json()

    errors = validate_budget(data)

    if errors:
        logger.warning(
            f"Budget update validation failed for budget {budget_id}"
        )

        return error_response(
            "Validation failed",
            400,
            errors
        )

    user_id = get_jwt_identity()

    logger.info(
        f"User {user_id} is updating budget {budget_id}"
    )

    result = update_budget(
        user_id=user_id,
        budget_id=budget_id,
        category=data["category"],
        amount=data["amount"],
        month=data["month"],
        year=data["year"]
    )

    if result["success"]:
        logger.info(
            f"Budget {budget_id} updated successfully by User {user_id}"
        )

        return success_response(
            "Budget updated successfully",
            result.get("budget")
        )

    logger.warning(
        f"Budget update failed for budget {budget_id}"
    )

    return error_response(
        result["message"],
        404
    )


@jwt_required()
def remove_budget(budget_id):
    user_id = get_jwt_identity()

    logger.info(
        f"User {user_id} is deleting budget {budget_id}"
    )

    result = delete_budget(user_id, budget_id)

    if result["success"]:
        logger.info(
            f"Budget {budget_id} deleted successfully by User {user_id}"
        )

        return success_response(
            "Budget deleted successfully",
            result.get("budget")
        )

    logger.warning(
        f"Budget deletion failed for budget {budget_id}"
    )

    return error_response(
        result["message"],
        404
    )


@jwt_required()
def remaining_budget():
    month = request.args.get("month", type=int)
    year = request.args.get("year", type=int)

    if not month or not year:
        logger.warning("Remaining budget request missing month or year")

        return error_response(
            "month and year are required",
            400
        )

    user_id = get_jwt_identity()

    logger.info(
        f"User {user_id} requested remaining budget for {month}/{year}"
    )

    result = get_remaining_budget(
        user_id=user_id,
        month=month,
        year=year
    )

    if result["success"]:
        logger.info(
            f"Remaining budget calculated successfully for User {user_id}"
        )

        return success_response(
            "Remaining budget fetched successfully",
            result
        )

    logger.warning(
        f"Failed to calculate remaining budget for User {user_id}"
    )

    return error_response(
        result["message"],
        400
    )


@jwt_required()
def budget_utilization():
    month = request.args.get("month", type=int)
    year = request.args.get("year", type=int)

    if not month or not year:
        logger.warning("Budget utilization request missing month or year")

        return error_response(
            "month and year are required",
            400
        )

    user_id = get_jwt_identity()

    logger.info(
        f"User {user_id} requested budget utilization for {month}/{year}"
    )

    result = get_budget_utilization(
        user_id=user_id,
        month=month,
        year=year
    )

    if result["success"]:
        logger.info(
            f"Budget utilization calculated successfully for User {user_id}"
        )

        return success_response(
            "Budget utilization fetched successfully",
            result
        )

    logger.warning(
        f"Failed to calculate budget utilization for User {user_id}"
    )

    return error_response(
        result["message"],
        400
    )