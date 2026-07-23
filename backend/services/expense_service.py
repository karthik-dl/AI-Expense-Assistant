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

def get_all_expenses(user_id):
    """
    Get all expenses for the logged-in user.
    """

    expenses = (
        Expense.query
        .filter_by(user_id=user_id)
        .order_by(Expense.expense_date.desc())
        .all()
    )

    expense_list = []

    for expense in expenses:
        expense_list.append({
            "id": expense.id,
            "description": expense.description,
            "amount": float(expense.amount),
            "category": expense.category,
            "expense_date": str(expense.expense_date)
        })

    return {
        "success": True,
        "count": len(expense_list),
        "expenses": expense_list
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