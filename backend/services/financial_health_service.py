from models.expense import Expense
from models.income import Income


def get_financial_health(user_id):
    """
    Generate financial health score.
    """

    incomes = Income.query.filter_by(user_id=user_id).all()
    expenses = Expense.query.filter_by(user_id=user_id).all()

    total_income = sum(
        float(income.amount)
        for income in incomes
    )

    total_expense = sum(
        float(expense.amount)
        for expense in expenses
    )

    savings = total_income - total_expense

    if total_income == 0:
        return {
            "success": False,
            "message": "No income found."
        }

    savings_rate = round(
        (savings / total_income) * 100,
        2
    )

    score = 50

    if savings_rate >= 40:
        score += 40
    elif savings_rate >= 25:
        score += 30
    elif savings_rate >= 10:
        score += 20
    elif savings_rate >= 0:
        score += 10

    if total_expense <= total_income:
        score += 10

    score = min(score, 100)

    if score >= 85:
        status = "Excellent"
        advice = (
            "Excellent financial discipline. "
            "Keep maintaining your savings."
        )

    elif score >= 70:
        status = "Good"
        advice = (
            "Your finances are healthy. "
            "Try to increase your savings further."
        )

    elif score >= 50:
        status = "Average"
        advice = (
            "Reduce unnecessary expenses to improve savings."
        )

    else:
        status = "Poor"
        advice = (
            "Your spending is higher than recommended. "
            "Focus on budgeting and saving."
        )

    return {
        "success": True,
        "health_score": {
            "score": score,
            "status": status,
            "income": total_income,
            "expense": total_expense,
            "savings": savings,
            "savings_rate": savings_rate,
            "advice": advice
        }
    }