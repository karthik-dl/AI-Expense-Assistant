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
from routes.report_routes import report_bp
from routes.auth_routes import auth_bp
from routes.profile_routes import profile_bp
from routes.dashboard_routes import dashboard_bp
from routes.insight_routes import insight_bp
from middleware.error_handler import register_error_handlers
from routes.analytics_routes import analytics_bp
from routes.recommendation_routes import recommendation_bp
from routes.financial_health_routes import (financial_health_bp)
from routes.ai_summary_routes import ai_summary_bp

# Create Migrate instance
migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__)

    app.config.from_object(config_class)

    register_error_handlers(app)
    # Enable CORS
    CORS(app,
    resources={r"/api/*": {"origins": "http://localhost:5173"}},
    supports_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],)
    
    jwt = JWTManager(app)
    # app.register_blueprint(expense_bp, url_prefix="/api")
    app.register_blueprint(user_bp, url_prefix="/api")
    app.register_blueprint(expense_bp, url_prefix="/api")
    app.register_blueprint(income_bp, url_prefix="/api")
    app.register_blueprint(budget_bp, url_prefix="/api")
    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(profile_bp, url_prefix="/api")
    app.register_blueprint(dashboard_bp,url_prefix="/api")
    app.register_blueprint(report_bp,url_prefix="/api")
    app.register_blueprint(insight_bp,url_prefix="/api")
    app.register_blueprint(analytics_bp,url_prefix="/api")
    app.register_blueprint(recommendation_bp,url_prefix="/api")
    app.register_blueprint(ai_summary_bp,url_prefix="/api")
    app.register_blueprint(financial_health_bp,url_prefix="/api")
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