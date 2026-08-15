from database import db
from models.user import User
from utils.password import hash_password, verify_password

from flask_jwt_extended import create_access_token

def register_user(name, email, password):
    """
    Register a new user.
    """

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return {
            "success": False,
            "message": "Email already exists"
        }

    new_user = User(
        name=name,
        email=email,
        password=hash_password(password)
    )

    db.session.add(new_user)
    db.session.commit()

    return {
        "success": True,
        "message": "User registered successfully"
    }


def login_user(email, password):
    print("Login Email:", email)

    user = User.query.filter_by(email=email).first()

    print("User Found:", user)

    if not user:
        return {
            "success": False,
            "message": "User not found"
        }

    print("Stored Password:", user.password)

    is_valid = verify_password(password, user.password)

    print("Password Match:", is_valid)

    if not is_valid:
        return {
            "success": False,
            "message": "Wrong password"
        }

    access_token = create_access_token(identity=str(user.id))

    return {
        "success": True,
        "message": "Login successful",
        "access_token": access_token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    }