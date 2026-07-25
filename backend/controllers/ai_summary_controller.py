from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from services.ai_summary_service import (
    generate_ai_summary
)

from utils.logger import logger
from utils.response import (
    success_response,
    error_response
)


@jwt_required()
def ai_summary():

    user_id = get_jwt_identity()

    logger.info(
        f"Generating AI financial summary for User {user_id}"
    )

    result = generate_ai_summary(user_id)

    if result["success"]:

        logger.info(
            f"AI summary generated successfully for User {user_id}"
        )

        return success_response(
            "AI summary generated successfully",
            result
        )

    return error_response(
        result["message"],
        404
    )