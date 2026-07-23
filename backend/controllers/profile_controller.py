from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity


@jwt_required()
def profile():
    user_id = get_jwt_identity()

    return jsonify({
        "success": True,
        "message": "Profile fetched successfully",
        "user_id": user_id
    }), 200