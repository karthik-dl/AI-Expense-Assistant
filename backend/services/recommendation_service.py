from models.budget import Budget
from models.expense import Expense


def get_budget_recommendations(user_id):
    """
    Compare spending against budgets and
    generate recommendations.
    """

    budgets = Budget.query.filter_by(user_id=user_id).all()

    if not budgets:
        return {
            "success": False,
            "message": "No budgets found."
        }

    recommendations = []

    for budget in budgets:

        expenses = Expense.query.filter_by(
            user_id=user_id,
            category=budget.category
        ).all()

        spent = sum(float(exp.amount) for exp in expenses)

        budget_amount = float(budget.amount)

        if spent > budget_amount:

            recommendations.append({
                "category": budget.category,
                "budget": budget_amount,
                "spent": spent,
                "remaining": 0,
                "status": "Exceeded",
                "message": (
                    f"You exceeded your {budget.category} budget "
                    f"by {round(spent - budget_amount, 2)}."
                )
            })

        elif spent >= budget_amount * 0.8:

            recommendations.append({
                "category": budget.category,
                "budget": budget_amount,
                "spent": spent,
                "remaining": round(budget_amount - spent, 2),
                "status": "Warning",
                "message": (
                    f"You've used more than 80% of your "
                    f"{budget.category} budget."
                )
            })

        else:

            recommendations.append({
                "category": budget.category,
                "budget": budget_amount,
                "spent": spent,
                "remaining": round(budget_amount - spent, 2),
                "status": "Good",
                "message": (
                    f"You're within your {budget.category} budget."
                )
            })

    return {
        "success": True,
        "recommendations": recommendations
    }