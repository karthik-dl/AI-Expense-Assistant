from flask import Blueprint

from controllers.financial_health_controller import (
    financial_health
)

financial_health_bp = Blueprint(
    "financial_health_bp",
    __name__
)

financial_health_bp.route(
    "/financial-health",
    methods=["GET"]
)(financial_health)