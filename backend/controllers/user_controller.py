from flask import request, jsonify

from database import db
from models.user import User


def get_users():
    users = User.query.all()

    data = []

    for user in users:
        data.append({
            "id": user.id,
            "name": user.name,
            "email": user.email
        })

    return jsonify(data), 200


def create_user():
    data = request.get_json()

    user = User(
        name=data["name"],
        email=data["email"],
        password=data["password"]
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "User created successfully"
    }), 201