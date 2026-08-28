from flask import Blueprint

from controllers.profile_controller import (
    profile,
    change_password,
    delete_account
)


profile_bp = Blueprint(
    "profile_bp",
    __name__
)


profile_bp.route(
    "/profile",
    methods=["GET", "PUT"]
)(profile)


profile_bp.route(
    "/profile/change-password",
    methods=["PUT"]
)(change_password)


profile_bp.route(
    "/profile",
    methods=["DELETE"]
)(delete_account)