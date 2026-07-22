from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate

from config import Config
from database import db

# Import models so SQLAlchemy registers them
from models import User, Expense, Income, Budget

# Create Migrate instance
migrate = Migrate()


def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Enable CORS
    CORS(app)

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