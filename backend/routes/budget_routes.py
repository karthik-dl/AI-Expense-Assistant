from flask import Blueprint
from controllers.budget_controller import (
    get_budget,
    create_budget
)

budget_bp = Blueprint("budget_bp", __name__)

budget_bp.route("/budgets", methods=["GET"])(get_budget)
budget_bp.route("/budgets", methods=["POST"])(create_budget)