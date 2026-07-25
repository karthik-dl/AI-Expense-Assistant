from flask import Blueprint

from controllers.ai_summary_controller import ai_summary

ai_summary_bp = Blueprint(
    "ai_summary_bp",
    __name__
)

ai_summary_bp.route(
    "/ai-summary",
    methods=["GET"]
)(ai_summary)