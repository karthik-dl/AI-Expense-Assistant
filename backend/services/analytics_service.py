from collections import defaultdict
from calendar import month_name

from models.expense import Expense
from models.income import Income


def get_monthly_analytics(user_id):
    """
    Generate monthly income, expense and savings analytics.
    """

    monthly_income = defaultdict(float)
    monthly_expense = defaultdict(float)

    incomes = Income.query.filter_by(user_id=user_id).all()
    expenses = Expense.query.filter_by(user_id=user_id).all()

    for income in incomes:
        month = income.income_date.month
        monthly_income[month] += float(income.amount)

    for expense in expenses:
        month = expense.expense_date.month
        monthly_expense[month] += float(expense.amount)

    analytics = []

    for month in range(1, 13):
        income = monthly_income[month]
        expense = monthly_expense[month]

        analytics.append({
            "month": month_name[month],
            "income": income,
            "expense": expense,
            "savings": income - expense
        })

    return {
        "success": True,
        "analytics": analytics
    }