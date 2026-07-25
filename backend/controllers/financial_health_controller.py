from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from services.financial_health_service import (
    get_financial_health
)

from utils.response import (
    success_response,
    error_response
)

from utils.logger import logger


@jwt_required()
def financial_health():

    user_id = get_jwt_identity()

    logger.info(
        f"Generating financial health score for User {user_id}"
    )

    result = get_financial_health(user_id)

    if result["success"]:

        logger.info(
            f"Financial health score generated for User {user_id}"
        )

        return success_response(
            "Financial health calculated successfully",
            result["health_score"]
        )

    return error_response(
        result["message"],
        404
    )