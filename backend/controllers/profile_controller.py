from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import (
    check_password_hash,
    generate_password_hash
)

from database import db
from models.user import User


def build_profile(user):
    total_expenses = sum(
        float(expense.amount or 0)
        for expense in user.expenses
    )

    total_income = sum(
        float(income.amount or 0)
        for income in user.incomes
    )

    total_transactions = (
        len(user.expenses) +
        len(user.incomes)
    )

    active_budgets = len(user.budgets)

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "created_at": (
            user.created_at.isoformat()
            if user.created_at
            else None
        ),
        "stats": {
            "expenses": round(
                total_expenses,
                2
            ),
            "income": round(
                total_income,
                2
            ),
            "budgets": active_budgets,
            "transactions": total_transactions
        }
    }


@jwt_required()
def profile():
    user_id = get_jwt_identity()

    user = db.session.get(
        User,
        user_id
    )

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found"
        }), 404

    if request.method == "GET":
        return jsonify({
            "success": True,
            "user": build_profile(user)
        }), 200

    data = request.get_json() or {}

    name = data.get(
        "name",
        ""
    ).strip()

    email = data.get(
        "email",
        ""
    ).strip().lower()

    if not name:
        return jsonify({
            "success": False,
            "message": "Name is required"
        }), 400

    if not email:
        return jsonify({
            "success": False,
            "message": "Email is required"
        }), 400

    existing_user = User.query.filter(
        User.email == email,
        User.id != user.id
    ).first()

    if existing_user:
        return jsonify({
            "success": False,
            "message": "Email already exists"
        }), 400

    try:
        user.name = name
        user.email = email

        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Profile updated successfully",
            "user": build_profile(user)
        }), 200

    except SQLAlchemyError:
        db.session.rollback()

        return jsonify({
            "success": False,
            "message": "Failed to update profile"
        }), 500


@jwt_required()
def change_password():
    user_id = get_jwt_identity()

    user = db.session.get(
        User,
        user_id
    )

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found"
        }), 404

    data = request.get_json() or {}

    current_password = data.get(
        "current_password",
        ""
    )

    new_password = data.get(
        "new_password",
        ""
    )

    confirm_password = data.get(
        "confirm_password",
        ""
    )

    if (
        not current_password
        or not new_password
        or not confirm_password
    ):
        return jsonify({
            "success": False,
            "message": "All fields are required"
        }), 400

    if not check_password_hash(
        user.password,
        current_password
    ):
        return jsonify({
            "success": False,
            "message": "Current password is incorrect"
        }), 400

    if len(new_password) < 8:
        return jsonify({
            "success": False,
            "message": "Password must be at least 8 characters"
        }), 400

    if new_password != confirm_password:
        return jsonify({
            "success": False,
            "message": "Passwords do not match"
        }), 400

    try:
        user.password = generate_password_hash(
            new_password
        )

        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Password changed successfully"
        }), 200

    except SQLAlchemyError:
        db.session.rollback()

        return jsonify({
            "success": False,
            "message": "Failed to change password"
        }), 500


@jwt_required()
def delete_account():
    user_id = get_jwt_identity()

    user = db.session.get(
        User,
        user_id
    )

    if not user:
        return jsonify({
            "success": False,
            "message": "User not found"
        }), 404

    data = request.get_json() or {}

    password = data.get(
        "password",
        ""
    )

    if not password:
        return jsonify({
            "success": False,
            "message": "Password is required"
        }), 400

    if not check_password_hash(
        user.password,
        password
    ):
        return jsonify({
            "success": False,
            "message": "Incorrect password"
        }), 400

    try:
        db.session.delete(user)
        db.session.commit()

        return jsonify({
            "success": True,
            "message": "Account deleted successfully"
        }), 200

    except SQLAlchemyError:
        db.session.rollback()

        return jsonify({
            "success": False,
            "message": "Failed to delete account"
        }), 500