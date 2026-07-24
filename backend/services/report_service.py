from sqlalchemy import func, extract

from database import db
from models.expense import Expense
from models.income import Income
from models.budget import Budget


def get_monthly_report(user_id, month, year):

    income = (
        db.session.query(
            func.coalesce(func.sum(Income.amount), 0)
        )
        .filter(
            Income.user_id == user_id,
            extract("month", Income.income_date) == month,
            extract("year", Income.income_date) == year
        )
        .scalar()
    )

    expense = (
        db.session.query(
            func.coalesce(func.sum(Expense.amount), 0)
        )
        .filter(
            Expense.user_id == user_id,
            extract("month", Expense.expense_date) == month,
            extract("year", Expense.expense_date) == year
        )
        .scalar()
    )

    budget = (
        db.session.query(
            func.coalesce(func.sum(Budget.amount), 0)
        )
        .filter(
            Budget.user_id == user_id,
            Budget.month == month,
            Budget.year == year
        )
        .scalar()
    )

    income = float(income or 0)
    expense = float(expense or 0)
    budget = float(budget or 0)

    budget_used = 0

    if budget > 0:
        budget_used = round((expense / budget) * 100, 2)

    top_category = (
        db.session.query(
            Expense.category,
            func.sum(Expense.amount).label("total")
        )
        .filter(
            Expense.user_id == user_id,
            extract("month", Expense.expense_date) == month,
            extract("year", Expense.expense_date) == year
        )
        .group_by(Expense.category)
        .order_by(func.sum(Expense.amount).desc())
        .first()
    )

    return {
        "success": True,
        "report": {
            "income": income,
            "expense": expense,
            "savings": income - expense,
            "budget": budget,
            "budget_used": budget_used,
            "top_category": top_category[0] if top_category else None
        }
    }


def get_yearly_report(user_id, year):

    report = []

    for month in range(1, 13):

        income = (
            db.session.query(
                func.coalesce(func.sum(Income.amount), 0)
            )
            .filter(
                Income.user_id == user_id,
                extract("month", Income.income_date) == month,
                extract("year", Income.income_date) == year
            )
            .scalar()
        )

        expense = (
            db.session.query(
                func.coalesce(func.sum(Expense.amount), 0)
            )
            .filter(
                Expense.user_id == user_id,
                extract("month", Expense.expense_date) == month,
                extract("year", Expense.expense_date) == year
            )
            .scalar()
        )

        income = float(income or 0)
        expense = float(expense or 0)

        report.append({
            "month": month,
            "income": income,
            "expense": expense,
            "savings": income - expense
        })

    return {
        "success": True,
        "year": year,
        "report": report
    }


def get_category_analysis(user_id, month, year):

    categories = (
        db.session.query(
            Expense.category,
            func.sum(Expense.amount).label("total")
        )
        .filter(
            Expense.user_id == user_id,
            extract("month", Expense.expense_date) == month,
            extract("year", Expense.expense_date) == year
        )
        .group_by(Expense.category)
        .order_by(func.sum(Expense.amount).desc())
        .all()
    )

    return {
        "success": True,
        "categories": [
            {
                "category": category,
                "amount": float(amount or 0)
            }
            for category, amount in categories
        ]
    }


def get_cash_flow(user_id, year):

    cash_flow = []

    for month in range(1, 13):

        income = (
            db.session.query(
                func.coalesce(func.sum(Income.amount), 0)
            )
            .filter(
                Income.user_id == user_id,
                extract("month", Income.income_date) == month,
                extract("year", Income.income_date) == year
            )
            .scalar()
        )

        expense = (
            db.session.query(
                func.coalesce(func.sum(Expense.amount), 0)
            )
            .filter(
                Expense.user_id == user_id,
                extract("month", Expense.expense_date) == month,
                extract("year", Expense.expense_date) == year
            )
            .scalar()
        )

        income = float(income or 0)
        expense = float(expense or 0)

        cash_flow.append({
            "month": month,
            "income": income,
            "expense": expense,
            "balance": income - expense
        })

    return {
        "success": True,
        "cash_flow": cash_flow
    }


def get_top_expenses(user_id, limit=5):

    expenses = (
        Expense.query
        .filter_by(user_id=user_id)
        .order_by(Expense.amount.desc())
        .limit(limit)
        .all()
    )

    return {
        "success": True,
        "top_expenses": [
            {
                "id": expense.id,
                "description": expense.description,
                "category": expense.category,
                "amount": float(expense.amount),
                "expense_date": expense.expense_date.isoformat()
            }
            for expense in expenses
        ]
    }

def get_savings_analysis(user_id, year):

    savings = []

    for month in range(1, 13):

        income = (
            db.session.query(
                func.coalesce(func.sum(Income.amount), 0)
            )
            .filter(
                Income.user_id == user_id,
                extract("month", Income.income_date) == month,
                extract("year", Income.income_date) == year
            )
            .scalar()
        )

        expense = (
            db.session.query(
                func.coalesce(func.sum(Expense.amount), 0)
            )
            .filter(
                Expense.user_id == user_id,
                extract("month", Expense.expense_date) == month,
                extract("year", Expense.expense_date) == year
            )
            .scalar()
        )

        income = float(income or 0)
        expense = float(expense or 0)

        savings.append({
            "month": month,
            "income": income,
            "expense": expense,
            "savings": income - expense
        })

    return {
        "success": True,
        "savings": savings
    }