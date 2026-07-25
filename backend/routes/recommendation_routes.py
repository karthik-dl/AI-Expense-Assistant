from flask import Blueprint

from controllers.recommendation_controller import (
    budget_recommendations
)

recommendation_bp = Blueprint(
    "recommendation_bp",
    __name__
)

recommendation_bp.route(
    "/recommendations",
    methods=["GET"]
)(budget_recommendations)