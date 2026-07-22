from flask import Blueprint
from controllers.expense_controller import (
    get_expenses,
    create_expense
)

expense_bp = Blueprint("expense_bp", __name__)

expense_bp.route("/expenses", methods=["GET"])(get_expenses)
expense_bp.route("/expenses", methods=["POST"])(create_expense)