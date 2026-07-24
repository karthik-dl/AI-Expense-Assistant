from sqlalchemy import func, extract
from datetime import datetime
from database import db
from models.expense import Expense
from models.income import Income
from models.budget import Budget


def get_dashboard_summary(user_id):
    total_income = (
        db.session.query(func.coalesce(func.sum(Income.amount), 0))
        .filter(Income.user_id == user_id)
        .scalar()
    )

    total_expense = (
        db.session.query(func.coalesce(func.sum(Expense.amount), 0))
        .filter(Expense.user_id == user_id)
        .scalar()
    )

    total_income = float(total_income or 0)
    total_expense = float(total_expense or 0)

    total_budgets = Budget.query.filter_by(user_id=user_id).count()

    total_income_transactions = Income.query.filter_by(
        user_id=user_id
    ).count()

    total_expense_transactions = Expense.query.filter_by(
        user_id=user_id
    ).count()

    return {
        "success": True,
        "summary": {
            "total_income": total_income,
            "total_expense": total_expense,
            "net_balance": total_income - total_expense,
            "total_budgets": total_budgets,
            "total_income_transactions": total_income_transactions,
            "total_expense_transactions": total_expense_transactions
        }
    }


def get_monthly_summary(user_id):
    current_month = datetime.now().month
    current_year = datetime.now().year

    total_income = (
        db.session.query(
            func.coalesce(func.sum(Income.amount), 0)
        )
        .filter(
            Income.user_id == user_id,
            extract("month", Income.income_date) == current_month,
            extract("year", Income.income_date) == current_year
        )
        .scalar()
    )

    total_expense = (
        db.session.query(
            func.coalesce(func.sum(Expense.amount), 0)
        )
        .filter(
            Expense.user_id == user_id,
            extract("month", Expense.expense_date) == current_month,
            extract("year", Expense.expense_date) == current_year
        )
        .scalar()
    )

    total_income = float(total_income or 0)
    total_expense = float(total_expense or 0)

    return {
        "success": True,
        "monthly_summary": {
            "month": current_month,
            "year": current_year,
            "income": total_income,
            "expense": total_expense,
            "savings": total_income - total_expense
        }
    }


def get_category_expenses(user_id):
    expenses = (
        db.session.query(
            Expense.category,
            func.sum(Expense.amount)
        )
        .filter(
            Expense.user_id == user_id
        )
        .group_by(
            Expense.category
        )
        .all()
    )

    result = []

    for category, amount in expenses:
        result.append({
            "category": category,
            "amount": float(amount or 0)
        })

    return {
        "success": True,
        "categories": result
    }


def get_recent_transactions(user_id):
    expenses = Expense.query.filter_by(
        user_id=user_id
    ).order_by(
        Expense.created_at.desc()
    ).limit(5).all()

    incomes = Income.query.filter_by(
        user_id=user_id
    ).order_by(
        Income.created_at.desc()
    ).limit(5).all()

    transactions = []

    for expense in expenses:
        transactions.append({
            "type": "Expense",
            "title": expense.description,
            "category": expense.category,
            "amount": float(expense.amount),
            "date": expense.expense_date.isoformat()
        })

    for income in incomes:
        transactions.append({
            "type": "Income",
            "title": income.source,
            "category": income.category,
            "amount": float(income.amount),
            "date": income.income_date.isoformat()
        })

    transactions.sort(
        key=lambda x: x["date"],
        reverse=True
    )

    return {
        "success": True,
        "transactions": transactions[:10]
    }