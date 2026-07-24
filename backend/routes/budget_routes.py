from flask import Blueprint

from controllers.budget_controller import (
    add_budget,
    get_budgets,
    get_budget,
    edit_budget,
    remove_budget,
    remaining_budget,
    budget_utilization
)

budget_bp = Blueprint("budget_bp", __name__)


budget_bp.route("/budgets", methods=["POST"])(add_budget)
budget_bp.route("/budgets", methods=["GET"])(get_budgets)
budget_bp.route("/budgets/<int:budget_id>", methods=["GET"])(get_budget)
budget_bp.route("/budgets/<int:budget_id>", methods=["PUT"])(edit_budget)
budget_bp.route("/budgets/<int:budget_id>", methods=["DELETE"])(remove_budget)
budget_bp.route(
    "/budgets/remaining",
    methods=["GET"]
)(remaining_budget)
budget_bp.route(
    "/budgets/utilization",
    methods=["GET"]
)(budget_utilization)