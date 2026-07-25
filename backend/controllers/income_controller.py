from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from utils.validators import validate_income
from utils.response import success_response, error_response
from utils.logger import logger

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

    errors = validate_income(data)

    if errors:
        logger.warning("Income validation failed")
        return error_response(
            "Validation failed",
            400,
            errors
        )

    user_id = get_jwt_identity()

    logger.info(f"User {user_id} is creating income")

    result = create_income(
        user_id=user_id,
        source=data["source"],
        category=data["category"],
        amount=data["amount"],
        income_date=data["income_date"],
        notes=data.get("notes")
    )

    if result["success"]:
        logger.info(f"Income created successfully by User {user_id}")
        return success_response(
            "Income created successfully",
            result.get("income"),
            201
        )

    logger.warning(f"Income creation failed for User {user_id}")

    return error_response(
        result["message"],
        400
    )


@jwt_required()
@jwt_required()
def get_incomes():
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
    sort = request.args.get("sort", default="income_date")

    logger.info(
        f"User {user_id} requested incomes | "
        f"page={page}, per_page={per_page}, "
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

    result = get_all_incomes(
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
            "Incomes fetched successfully",
            {
                "incomes": result["incomes"],
                "pagination": result["pagination"]
            }
        )

    logger.warning(f"Failed to fetch incomes for User {user_id}")

    return error_response(
        result["message"],
        400
    )
    
@jwt_required()
def get_income(income_id):
    user_id = get_jwt_identity()

    logger.info(f"User {user_id} requested income {income_id}")

    result = get_income_by_id(user_id, income_id)

    if result["success"]:
        return success_response(
            "Income fetched successfully",
            result.get("income")
        )

    logger.warning(f"Income {income_id} not found")

    return error_response(
        result["message"],
        404
    )


@jwt_required()
def edit_income(income_id):
    data = request.get_json()

    errors = validate_income(data)

    if errors:
        logger.warning(
            f"Income update validation failed for income {income_id}"
        )

        return error_response(
            "Validation failed",
            400,
            errors
        )

    user_id = get_jwt_identity()

    logger.info(
        f"User {user_id} is updating income {income_id}"
    )

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
        logger.info(
            f"Income {income_id} updated successfully"
        )

        return success_response(
            "Income updated successfully",
            result.get("income")
        )

    logger.warning(
        f"Income update failed for income {income_id}"
    )

    return error_response(
        result["message"],
        404
    )


@jwt_required()
def remove_income(income_id):
    user_id = get_jwt_identity()

    logger.info(
        f"User {user_id} is deleting income {income_id}"
    )

    result = delete_income(user_id, income_id)

    if result["success"]:
        logger.info(
            f"Income {income_id} deleted successfully"
        )

        return success_response(
            "Income deleted successfully",
            result.get("income")
        )

    logger.warning(
        f"Income deletion failed for income {income_id}"
    )

    return error_response(
        result["message"],
        404
    )


@jwt_required()
def total_income():
    user_id = get_jwt_identity()

    logger.info(f"User {user_id} requested total income")

    result = get_total_income(user_id)

    if result["success"]:
        return success_response(
            "Total income fetched successfully",
            result.get("total_income")
        )

    logger.warning(
        f"Failed to fetch total income for User {user_id}"
    )

    return error_response(
        result["message"],
        400
    )


@jwt_required()
def income_category_summary():
    user_id = get_jwt_identity()

    logger.info(
        f"User {user_id} requested income category summary"
    )

    result = get_income_by_category(user_id)

    if result["success"]:
        return success_response(
            "Income category summary fetched successfully",
            result.get("categories")
        )

    logger.warning(
        f"Failed to fetch income category summary for User {user_id}"
    )

    return error_response(
        result["message"],
        400
    )