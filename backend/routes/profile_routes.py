from flask import Blueprint
from controllers.profile_controller import profile

profile_bp = Blueprint("profile_bp", __name__)

profile_bp.route("/profile", methods=["GET"])(profile)