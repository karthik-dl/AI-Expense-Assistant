from models.income import Income
from database import db


def create_income(
    user_id,
    source,
    category,
    amount,
    income_date,
    notes=None
):
    """
    Create a new income.
    """

    income = Income(
        source=source,
        category=category,
        amount=amount,
        income_date=income_date,
        notes=notes,
        user_id=user_id
    )

    db.session.add(income)
    db.session.commit()

    return {
        "success": True,
        "message": "Income created successfully",
        "income": income.to_dict()
    }


def get_all_incomes(user_id):
    """
    Get all incomes for the logged-in user.
    """

    incomes = (
        Income.query
        .filter_by(user_id=user_id)
        .order_by(Income.income_date.desc())
        .all()
    )

    return {
        "success": True,
        "count": len(incomes),
        "incomes": [income.to_dict() for income in incomes]
    }


def get_income_by_id(user_id, income_id):
    """
    Get a single income.
    """

    income = Income.query.filter_by(
        id=income_id,
        user_id=user_id
    ).first()

    if not income:
        return {
            "success": False,
            "message": "Income not found"
        }

    return {
        "success": True,
        "income": income.to_dict()
    }


def update_income(
    user_id,
    income_id,
    source,
    category,
    amount,
    income_date,
    notes=None
):
    """
    Update an income.
    """

    income = Income.query.filter_by(
        id=income_id,
        user_id=user_id
    ).first()

    if not income:
        return {
            "success": False,
            "message": "Income not found"
        }

    income.source = source
    income.category = category
    income.amount = amount
    income.income_date = income_date
    income.notes = notes

    db.session.commit()

    return {
        "success": True,
        "message": "Income updated successfully",
        "income": income.to_dict()
    }


def delete_income(user_id, income_id):
    """
    Delete an income.
    """

    income = Income.query.filter_by(
        id=income_id,
        user_id=user_id
    ).first()

    if not income:
        return {
            "success": False,
            "message": "Income not found"
        }

    db.session.delete(income)
    db.session.commit()

    return {
        "success": True,
        "message": "Income deleted successfully"
    }


def get_total_income(user_id):
    """
    Calculate total income for the logged-in user.
    """

    incomes = Income.query.filter_by(user_id=user_id).all()

    total = sum(float(income.amount) for income in incomes)

    return {
        "success": True,
        "total_income": total
    }


def get_income_by_category(user_id):
    """
    Group income totals by category.
    """

    incomes = Income.query.filter_by(user_id=user_id).all()

    categories = {}

    for income in incomes:
        if income.category not in categories:
            categories[income.category] = 0

        categories[income.category] += float(income.amount)

    return {
        "success": True,
        "categories": categories
    }