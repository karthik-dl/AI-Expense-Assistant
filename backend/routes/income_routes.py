from flask import Blueprint
from controllers.income_controller import (
    get_incomes,
    create_income
)

income_bp = Blueprint("income_bp", __name__)

income_bp.route("/incomes", methods=["GET"])(get_incomes)
income_bp.route("/incomes", methods=["POST"])(create_income)