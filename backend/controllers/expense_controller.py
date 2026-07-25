from flask import request
from flask_jwt_extended import jwt_required, get_jwt_identity

from utils.validators import validate_expense
from utils.response import success_response, error_response
from utils.logger import logger

from services.ai_service import predict_category

from services.expense_service import (
    create_expense,
    delete_expense,
    get_all_expenses,
    get_expense_by_id,
    update_expense
)


@jwt_required()
def add_expense():
    data = request.get_json()

    errors = validate_expense(data)

    if errors:
        logger.warning("Expense validation failed")

        return error_response(
            "Validation failed",
            400,
            errors
        )

    user_id = get_jwt_identity()

    description = data["description"]

    # Predict category if not provided
    category = data.get("category")

    if not category:
        category = predict_category(description)

    logger.info(
        f"User {user_id} is creating an expense "
        f"with category '{category}'"
    )

    result = create_expense(
        user_id=user_id,
        description=description,
        amount=data["amount"],
        category=category,
        expense_date=data["expense_date"]
    )

    if result["success"]:
        logger.info(
            f"Expense created successfully by User {user_id}"
        )

        return success_response(
            "Expense created successfully",
            result.get("expense"),
            201
        )

    logger.warning(
        f"Expense creation failed for User {user_id}"
    )

    return error_response(
        result["message"],
        400
    )


@jwt_required()
def get_expenses():
    user_id = get_jwt_identity()

    # Pagination
    page = request.args.get("page", default=1, type=int)
    per_page = request.args.get("per_page", default=10, type=int)

    # Filters
    category = request.args.get("category")
    start_date = request.args.get("start_date")
    end_date = request.args.get("end_date")

    # Advanced Filters
    search = request.args.get("search")
    min_amount = request.args.get("min_amount", type=float)
    max_amount = request.args.get("max_amount", type=float)
    month = request.args.get("month", type=int)
    year = request.args.get("year", type=int)

    # Sorting
    sort = request.args.get(
        "sort",
        default="expense_date"
    )

    logger.info(
        f"User {user_id} requested expenses | "
        f"page={page}, "
        f"per_page={per_page}, "
        f"category={category}, "
        f"search={search}, "
        f"min_amount={min_amount}, "
        f"max_amount={max_amount}, "
        f"month={month}, "
        f"year={year}, "
        f"start_date={start_date}, "
        f"end_date={end_date}, "
        f"sort={sort}"
    )

    result = get_all_expenses(
        user_id=user_id,
        page=page,
        per_page=per_page,
        category=category,
        start_date=start_date,
        end_date=end_date,
        sort=sort,
        search=search,
        min_amount=min_amount,
        max_amount=max_amount,
        month=month,
        year=year
    )

    if result["success"]:
        return success_response(
            "Expenses fetched successfully",
            {
                "expenses": result["expenses"],
                "pagination": result["pagination"]
            }
        )

    logger.warning(
        f"Failed to fetch expenses for User {user_id}"
    )

    return error_response(
        result["message"],
        400
    )


@jwt_required()
def get_expense(expense_id):
    user_id = get_jwt_identity()

    logger.info(
        f"User {user_id} requested expense {expense_id}"
    )

    result = get_expense_by_id(
        user_id,
        expense_id
    )

    if result["success"]:
        return success_response(
            "Expense fetched successfully",
            result.get("expense")
        )

    logger.warning(
        f"Expense {expense_id} not found for User {user_id}"
    )

    return error_response(
        result["message"],
        404
    )


@jwt_required()
def edit_expense(expense_id):
    data = request.get_json()

    errors = validate_expense(data)

    if errors:
        logger.warning(
            f"Expense update validation failed for expense {expense_id}"
        )

        return error_response(
            "Validation failed",
            400,
            errors
        )

    user_id = get_jwt_identity()

    description = data["description"]

    category = data.get("category")

    if not category:
        category = predict_category(description)

    logger.info(
        f"User {user_id} is updating expense {expense_id}"
    )

    result = update_expense(
        user_id=user_id,
        expense_id=expense_id,
        description=description,
        amount=data["amount"],
        category=category,
        expense_date=data["expense_date"]
    )

    if result["success"]:
        logger.info(
            f"Expense {expense_id} updated successfully by User {user_id}"
        )

        return success_response(
            "Expense updated successfully",
            result.get("expense")
        )

    logger.warning(
        f"Expense update failed for expense {expense_id}"
    )

    return error_response(
        result["message"],
        404
    )


@jwt_required()
def remove_expense(expense_id):
    user_id = get_jwt_identity()

    logger.info(
        f"User {user_id} is deleting expense {expense_id}"
    )

    result = delete_expense(
        user_id,
        expense_id
    )

    if result["success"]:
        logger.info(
            f"Expense {expense_id} deleted successfully by User {user_id}"
        )

        return success_response(
            "Expense deleted successfully",
            None
        )

    logger.warning(
        f"Expense deletion failed for expense {expense_id}"
    )

    return error_response(
        result["message"],
        404
    )