from flask import Blueprint

from controllers.report_controller import (
    monthly_report,
    yearly_report,
    category_analysis,
    cash_flow,
    top_expenses,
    savings_analysis
)

report_bp = Blueprint(
    "report_bp",
    __name__
)

report_bp.route(
    "/reports/monthly",
    methods=["GET"]
)(monthly_report)

report_bp.route(
    "/reports/yearly",
    methods=["GET"]
)(yearly_report)

report_bp.route(
    "/reports/category-analysis",
    methods=["GET"]
)(category_analysis)

report_bp.route(
    "/reports/cash-flow",
    methods=["GET"]
)(cash_flow)

report_bp.route(
    "/reports/top-expenses",
    methods=["GET"]
)(top_expenses)

report_bp.route(
    "/reports/savings-analysis",
    methods=["GET"]
)(savings_analysis)