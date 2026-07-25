from collections import defaultdict

from models.expense import Expense


def get_spending_insights(user_id):
    """
    Generate spending insights for the logged-in user.
    """

    expenses = Expense.query.filter_by(user_id=user_id).all()

    if not expenses:
        return {
            "success": False,
            "message": "No expenses found"
        }

    total_expense = 0
    total_transactions = len(expenses)

    category_totals = defaultdict(float)

    largest_expense = None

    for expense in expenses:
        amount = float(expense.amount)

        total_expense += amount

        category_totals[expense.category] += amount

        if (
            largest_expense is None
            or amount > float(largest_expense.amount)
        ):
            largest_expense = expense

    average_expense = round(
        total_expense / total_transactions,
        2
    )

    top_category = max(
        category_totals,
        key=category_totals.get
    )

    return {
        "success": True,
        "insights": {
            "total_expenses": total_expense,
            "total_transactions": total_transactions,
            "average_expense": average_expense,
            "largest_expense": {
                "description": largest_expense.description,
                "amount": float(largest_expense.amount),
                "category": largest_expense.category,
                "expense_date": str(largest_expense.expense_date)
            },
            "top_category": {
                "category": top_category,
                "amount": category_totals[top_category]
            }
        }
    }