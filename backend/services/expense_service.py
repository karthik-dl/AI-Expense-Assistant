from models.expense import Expense
from database import db


def create_expense(user_id, description, amount, category, expense_date):
    """
    Create a new expense for the logged-in user.
    """

    expense = Expense(
        description=description,
        amount=amount,
        category=category,
        expense_date=expense_date,
        user_id=user_id
    )

    db.session.add(expense)
    db.session.commit()

    return {
        "success": True,
        "message": "Expense created successfully",
        "expense": {
            "id": expense.id,
            "description": expense.description,
            "amount": float(expense.amount),
            "category": expense.category,
            "expense_date": str(expense.expense_date)
        }
    }

def get_all_expenses(
    user_id,
    page=1,
    per_page=10,
    category=None,
    start_date=None,
    end_date=None,
    sort="expense_date"
):
    """
    Get expenses with pagination, filtering and sorting.
    """

    query = Expense.query.filter_by(user_id=user_id)

    # Category Filter
    if category:
        query = query.filter(Expense.category == category)

    # Date Filters
    if start_date:
        query = query.filter(Expense.expense_date >= start_date)

    if end_date:
        query = query.filter(Expense.expense_date <= end_date)

    # Sorting
    if sort == "amount":
        query = query.order_by(Expense.amount.desc())
    elif sort == "category":
        query = query.order_by(Expense.category.asc())
    else:
        query = query.order_by(Expense.expense_date.desc())

    pagination = query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    expense_list = []

    for expense in pagination.items:
        expense_list.append({
            "id": expense.id,
            "description": expense.description,
            "amount": float(expense.amount),
            "category": expense.category,
            "expense_date": str(expense.expense_date)
        })

    return {
        "success": True,
        "expenses": expense_list,
        "pagination": {
            "page": pagination.page,
            "per_page": pagination.per_page,
            "total_pages": pagination.pages,
            "total_records": pagination.total
        }
    }
    
def get_expense_by_id(user_id, expense_id):
    """
    Get a single expense belonging to the logged-in user.
    """

    expense = Expense.query.filter_by(
        id=expense_id,
        user_id=user_id
    ).first()

    if not expense:
        return {
            "success": False,
            "message": "Expense not found"
        }

    return {
        "success": True,
        "expense": {
            "id": expense.id,
            "description": expense.description,
            "amount": float(expense.amount),
            "category": expense.category,
            "expense_date": str(expense.expense_date)
        }
    }

def update_expense(
    user_id,
    expense_id,
    description,
    amount,
    category,
    expense_date
):
    """
    Update an expense belonging to the logged-in user.
    """

    expense = Expense.query.filter_by(
        id=expense_id,
        user_id=user_id
    ).first()

    if not expense:
        return {
            "success": False,
            "message": "Expense not found"
        }

    expense.description = description
    expense.amount = amount
    expense.category = category
    expense.expense_date = expense_date

    db.session.commit()

    return {
        "success": True,
        "message": "Expense updated successfully",
        "expense": {
            "id": expense.id,
            "description": expense.description,
            "amount": float(expense.amount),
            "category": expense.category,
            "expense_date": str(expense.expense_date)
        }
    }
    
def delete_expense(user_id, expense_id):
    """
    Delete an expense belonging to the logged-in user.
    """

    expense = Expense.query.filter_by(
        id=expense_id,
        user_id=user_id
    ).first()

    if not expense:
        return {
            "success": False,
            "message": "Expense not found"
        }

    db.session.delete(expense)
    db.session.commit()

    return {
        "success": True,
        "message": "Expense deleted successfully"
    }