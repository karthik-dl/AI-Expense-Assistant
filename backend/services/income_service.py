from sqlalchemy import extract, or_

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


def get_all_incomes(
    user_id,
    page=1,
    per_page=10,
    category=None,
    start_date=None,
    end_date=None,
    sort="income_date",
    search=None,
    min_amount=None,
    max_amount=None,
    month=None,
    year=None
):
    """
    Get incomes with pagination, filtering,
    searching and sorting.
    """

    query = Income.query.filter_by(user_id=user_id)

    # Category Filter
    if category:
        query = query.filter(Income.category == category)

    # Search
    if search:
        query = query.filter(
            or_(
                Income.source.ilike(f"%{search}%"),
                Income.category.ilike(f"%{search}%")
            )
        )

    # Amount Filters
    if min_amount is not None:
        query = query.filter(Income.amount >= min_amount)

    if max_amount is not None:
        query = query.filter(Income.amount <= max_amount)

    # Date Filters
    if start_date:
        query = query.filter(
            Income.income_date >= start_date
        )

    if end_date:
        query = query.filter(
            Income.income_date <= end_date
        )

    # Month Filter
    if month:
        query = query.filter(
            extract("month", Income.income_date) == month
        )

    # Year Filter
    if year:
        query = query.filter(
            extract("year", Income.income_date) == year
        )

    # Sorting
    if sort == "amount":
        query = query.order_by(Income.amount.desc())

    elif sort == "category":
        query = query.order_by(Income.category.asc())

    elif sort == "source":
        query = query.order_by(Income.source.asc())

    else:
        query = query.order_by(
            Income.income_date.desc()
        )

    # Pagination
    pagination = query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    return {
        "success": True,
        "incomes": [
            income.to_dict()
            for income in pagination.items
        ],
        "pagination": {
            "page": pagination.page,
            "per_page": pagination.per_page,
            "total_pages": pagination.pages,
            "total_records": pagination.total,
            "has_next": pagination.has_next,
            "has_prev": pagination.has_prev,
            "next_page": pagination.next_num,
            "prev_page": pagination.prev_num
        }
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

    incomes = Income.query.filter_by(
        user_id=user_id
    ).all()

    total = sum(
        float(income.amount)
        for income in incomes
    )

    return {
        "success": True,
        "total_income": total
    }


def get_income_by_category(user_id):
    """
    Group income totals by category.
    """

    incomes = Income.query.filter_by(
        user_id=user_id
    ).all()

    categories = {}

    for income in incomes:
        if income.category not in categories:
            categories[income.category] = 0

        categories[income.category] += float(income.amount)

    return {
        "success": True,
        "categories": categories
    }