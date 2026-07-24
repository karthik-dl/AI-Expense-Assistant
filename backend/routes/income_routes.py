from flask import Blueprint

from controllers.income_controller import (
    add_income,
    get_incomes,
    get_income,
    edit_income,
    remove_income,
    total_income,
    income_category_summary
)

income_bp = Blueprint("income_bp", __name__)

# CRUD
income_bp.route("/incomes", methods=["POST"])(add_income)
income_bp.route("/incomes", methods=["GET"])(get_incomes)
income_bp.route("/incomes/<int:income_id>", methods=["GET"])(get_income)
income_bp.route("/incomes/<int:income_id>", methods=["PUT"])(edit_income)
income_bp.route("/incomes/<int:income_id>", methods=["DELETE"])(remove_income)

# Dashboard APIs
income_bp.route("/incomes/total", methods=["GET"])(total_income)
income_bp.route(
    "/incomes/category-summary",
    methods=["GET"]
)(income_category_summary)