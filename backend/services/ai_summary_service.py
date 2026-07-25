from services.financial_health_service import get_financial_health
from services.insights_service import get_spending_insights
from services.recommendation_service import get_budget_recommendations


def generate_ai_summary(user_id):
    """
    Generate an AI-style financial summary.
    """

    health = get_financial_health(user_id)
    insights = get_spending_insights(user_id)
    recommendations = get_budget_recommendations(user_id)

    if not health["success"]:
        return health

    if not insights["success"]:
        return insights

    score = health["health_score"]["score"]
    status = health["health_score"]["status"]

    top_category = insights["insights"]["top_category"]["category"]
    average = insights["insights"]["average_expense"]

    summary = []

    summary.append(
        f"Your financial health score is {score}/100 ({status})."
    )

    summary.append(
        f"Your highest spending category is '{top_category}'."
    )

    summary.append(
        f"Your average expense is {average:.2f}."
    )

    if recommendations["success"]:

        exceeded = []

        for item in recommendations["recommendations"]:

            if item["status"] == "Exceeded":
                exceeded.append(item["category"])

        if exceeded:
            summary.append(
                "You have exceeded the budget for: "
                + ", ".join(exceeded)
                + "."
            )
        else:
            summary.append(
                "Great job! You are currently within all budget limits."
            )

    summary.append(
        health["health_score"]["advice"]
    )

    return {
        "success": True,
        "summary": " ".join(summary),
        "health": health["health_score"],
        "insights": insights["insights"],
        "recommendations": (
            recommendations["recommendations"]
            if recommendations["success"]
            else []
        )
    }