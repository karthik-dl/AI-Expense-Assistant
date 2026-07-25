from flask_jwt_extended import jwt_required, get_jwt_identity

from services.insights_service import get_spending_insights
from utils.response import success_response, error_response
from utils.logger import logger


@jwt_required()
def spending_insights():
    """
    Generate spending insights for the logged-in user.
    """

    user_id = get_jwt_identity()

    logger.info(
        f"Generating spending insights for User {user_id}"
    )

    result = get_spending_insights(user_id)

    if result["success"]:
        logger.info(
            f"Spending insights generated successfully for User {user_id}"
        )

        return success_response(
            "Spending insights generated successfully",
            result["insights"]
        )

    logger.warning(
        f"No spending insights available for User {user_id}"
    )

    return error_response(
        result["message"],
        404
    )