from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from services.recommendation_service import (
    get_budget_recommendations
)

from utils.logger import logger
from utils.response import (
    success_response,
    error_response
)


@jwt_required()
def budget_recommendations():

    user_id = get_jwt_identity()

    logger.info(
        f"Generating recommendations for User {user_id}"
    )

    result = get_budget_recommendations(user_id)

    if result["success"]:

        logger.info(
            f"Recommendations generated for User {user_id}"
        )

        return success_response(
            "Budget recommendations generated successfully",
            result["recommendations"]
        )

    return error_response(
        result["message"],
        404
    )