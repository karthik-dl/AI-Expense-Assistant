from flask_jwt_extended import jwt_required, get_jwt_identity

from services.analytics_service import get_monthly_analytics

from utils.logger import logger
from utils.response import success_response, error_response


@jwt_required()
def monthly_analytics():
    """
    Monthly income vs expense analytics.
    """

    user_id = get_jwt_identity()

    logger.info(
        f"Generating monthly analytics for User {user_id}"
    )

    result = get_monthly_analytics(user_id)

    if result["success"]:
        logger.info(
            f"Monthly analytics generated successfully for User {user_id}"
        )

        return success_response(
            "Monthly analytics generated successfully",
            result["analytics"]
        )

    logger.warning(
        f"Monthly analytics failed for User {user_id}"
    )

    return error_response(
        result["message"],
        404
    )