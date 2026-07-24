from models.budget import Budget
from models.expense import Expense
from database import db
from sqlalchemy import extract


def create_budget(user_id, category, amount, month, year):
    """
    Create a budget.
    """

    existing_budget = Budget.query.filter_by(
        user_id=user_id,
        category=category,
        month=month,
        year=year
    ).first()

    if existing_budget:
        return {
            "success": False,
            "message": "Budget already exists for this category and month."
        }

    budget = Budget(
        category=category,
        amount=amount,
        month=month,
        year=year,
        user_id=user_id
    )

    db.session.add(budget)
    db.session.commit()

    return {
        "success": True,
        "message": "Budget created successfully.",
        "budget": budget.to_dict()
    }


def get_all_budgets(user_id):
    budgets = Budget.query.filter_by(user_id=user_id).all()

    return {
        "success": True,
        "count": len(budgets),
        "budgets": [budget.to_dict() for budget in budgets]
    }


def get_budget_by_id(user_id, budget_id):
    budget = Budget.query.filter_by(
        id=budget_id,
        user_id=user_id
    ).first()

    if not budget:
        return {
            "success": False,
            "message": "Budget not found."
        }

    return {
        "success": True,
        "budget": budget.to_dict()
    }


def update_budget(user_id, budget_id, category, amount, month, year):
    budget = Budget.query.filter_by(
        id=budget_id,
        user_id=user_id
    ).first()

    if not budget:
        return {
            "success": False,
            "message": "Budget not found."
        }

    budget.category = category
    budget.amount = amount
    budget.month = month
    budget.year = year

    db.session.commit()

    return {
        "success": True,
        "message": "Budget updated successfully.",
        "budget": budget.to_dict()
    }


def delete_budget(user_id, budget_id):
    budget = Budget.query.filter_by(
        id=budget_id,
        user_id=user_id
    ).first()

    if not budget:
        return {
            "success": False,
            "message": "Budget not found."
        }

    db.session.delete(budget)
    db.session.commit()

    return {
        "success": True,
        "message": "Budget deleted successfully."
    }


def get_remaining_budget(user_id, month, year):
    budgets = Budget.query.filter_by(
        user_id=user_id,
        month=month,
        year=year
    ).all()

    result = []

    for budget in budgets:
        spent = sum(
            float(expense.amount)
            for expense in Expense.query.filter(
                Expense.user_id == user_id,
                Expense.category == budget.category,
                extract("month", Expense.expense_date) == month,
                extract("year", Expense.expense_date) == year
            ).all()
        )

        remaining = float(budget.amount) - spent

        result.append({
            "category": budget.category,
            "budget": float(budget.amount),
            "spent": spent,
            "remaining": remaining
        })

    return {
        "success": True,
        "budgets": result
    }


def get_budget_utilization(user_id, month, year):
    budgets = Budget.query.filter_by(
        user_id=user_id,
        month=month,
        year=year
    ).all()

    result = []

    for budget in budgets:
        spent = sum(
            float(expense.amount)
            for expense in Expense.query.filter(
                Expense.user_id == user_id,
                Expense.category == budget.category,
                extract("month", Expense.expense_date) == month,
                extract("year", Expense.expense_date) == year
            ).all()
        )

        utilization = 0

        if float(budget.amount) > 0:
            utilization = round(
                (spent / float(budget.amount)) * 100,
                2
            )

        result.append({
            "category": budget.category,
            "budget": float(budget.amount),
            "spent": spent,
            "utilization_percentage": utilization
        })

    return {
        "success": True,
        "budgets": result
    }