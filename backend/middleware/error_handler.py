from flask import jsonify
from sqlalchemy.exc import SQLAlchemyError

from utils.logger import logger


def register_error_handlers(app):

    @app.errorhandler(SQLAlchemyError)
    def handle_database_error(error):
        logger.exception(error)

        return jsonify({
            "success": False,
            "message": "Database error occurred."
        }), 500

    @app.errorhandler(404)
    def handle_not_found(error):
        logger.warning(f"404 Error : {error}")

        return jsonify({
            "success": False,
            "message": "Resource not found."
        }), 404

    @app.errorhandler(400)
    def handle_bad_request(error):
        logger.warning(f"400 Error : {error}")

        return jsonify({
            "success": False,
            "message": "Bad request."
        }), 400

    @app.errorhandler(500)
    def handle_internal_error(error):
        logger.exception(error)

        return jsonify({
            "success": False,
            "message": "Internal server error."
        }), 500

    @app.errorhandler(Exception)
    def handle_general_exception(error):
        logger.exception(error)

        return jsonify({
            "success": False,
            "message": "Unexpected error occurred."
        }), 500