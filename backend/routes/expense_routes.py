from flask import Blueprint
from controllers.expense_controller import (
    add_expense,
    get_expenses,
    get_expense,edit_expense,remove_expense
)

expense_bp = Blueprint("expense_bp", __name__)

expense_bp.route("/expenses", methods=["POST"])(add_expense)
expense_bp.route("/expenses", methods=["GET"])(get_expenses)
expense_bp.route("/expenses/<int:expense_id>", methods=["GET"])(get_expense)
expense_bp.route("/expenses/<int:expense_id>", methods=["PUT"])(edit_expense)
expense_bp.route("/expenses/<int:expense_id>", methods=["DELETE"])(remove_expense)