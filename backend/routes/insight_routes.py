from flask import Blueprint

from controllers.insights_controller import spending_insights

insight_bp = Blueprint(
    "insight_bp",
    __name__
)

insight_bp.route(
    "/insights",
    methods=["GET"]
)(spending_insights)