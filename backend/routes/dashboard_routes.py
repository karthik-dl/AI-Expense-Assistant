from flask import Blueprint

from controllers.dashboard_controller import (
    dashboard_summary,
    monthly_summary,
    category_expenses,
    recent_transactions
)

dashboard_bp = Blueprint(
    "dashboard_bp",
    __name__
)

dashboard_bp.route(
    "/dashboard/summary",
    methods=["GET"]
)(dashboard_summary)

dashboard_bp.route(
    "/dashboard/monthly-summary",
    methods=["GET"]
)(monthly_summary)

dashboard_bp.route(
    "/dashboard/category-expenses",
    methods=["GET"]
)(category_expenses)

dashboard_bp.route(
    "/dashboard/recent-transactions",
    methods=["GET"]
)(recent_transactions)