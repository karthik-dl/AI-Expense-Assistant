from flask import request, jsonify
from services.auth_service import register_user, login_user


def register():
    data = request.get_json()

    # Validate required fields
    required_fields = ["name", "email", "password"]

    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({
                "success": False,
                "message": f"{field} is required"
            }), 400

    result = register_user(
        data["name"],
        data["email"],
        data["password"]
    )

    if result["success"]:
        return jsonify(result), 201

    return jsonify(result), 409


def login():
    data = request.get_json()

    required_fields = ["email", "password"]

    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({
                "success": False,
                "message": f"{field} is required"
            }), 400

    result = login_user(
        data["email"],
        data["password"]
    )

    return jsonify(result), 200

    return jsonify(result), 401