from flask import Blueprint
from controllers.auth_controller import register, login

auth_bp = Blueprint("auth_bp", __name__)

auth_bp.route("/auth/register", methods=["POST"])(register)
auth_bp.route("/auth/login", methods=["POST"])(login)