from flask import Blueprint

from controllers.analytics_controller import monthly_analytics

analytics_bp = Blueprint(
    "analytics_bp",
    __name__
)

analytics_bp.route(
    "/analytics",
    methods=["GET"]
)(monthly_analytics)