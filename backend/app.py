from flask import Flask, app
from flask_cors import CORS
from flask_migrate import Migrate

from config import Config
from database import db
from flask_jwt_extended import JWTManager
# Import models so SQLAlchemy registers them
from models import User, Expense, Income, Budget
from routes.user_routes import user_bp
from routes.expense_routes import expense_bp
from routes.income_routes import income_bp
from routes.budget_routes import budget_bp

from routes.auth_routes import auth_bp
from routes.profile_routes import profile_bp

# Create Migrate instance
migrate = Migrate()


def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Enable CORS
    CORS(app)
    
    jwt = JWTManager(app)
    # app.register_blueprint(expense_bp, url_prefix="/api")
    app.register_blueprint(user_bp, url_prefix="/api")
    app.register_blueprint(expense_bp, url_prefix="/api")
    app.register_blueprint(income_bp, url_prefix="/api")
    app.register_blueprint(budget_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(profile_bp, url_prefix="/api")
    # Initialize database
    db.init_app(app)

    # Initialize Flask-Migrate
    migrate.init_app(app, db)

    # -------------------- Routes -------------------- #

    @app.route("/")
    def home():
        return {
            "status": "success",
            "message": "AI Expense Assistant Backend Running 🚀"
        }

    @app.route("/health")
    def health():
        return {
            "status": "healthy"
        }

    return app


# Create the Flask application
app = create_app()


if __name__ == "__main__":
    app.run(debug=True)