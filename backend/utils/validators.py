from datetime import datetime


def validate_expense(data):
    errors = {}

    amount = data.get("amount")
    category = data.get("category")
    description = data.get("description")
    expense_date = data.get("expense_date")

    # Amount
    if amount is None:
        errors["amount"] = "Amount is required."
    else:
        try:
            amount = float(amount)
            if amount <= 0:
                errors["amount"] = "Amount must be greater than 0."
        except (ValueError, TypeError):
            errors["amount"] = "Amount must be a valid number."

    # Category
    if not category or not category.strip():
        errors["category"] = "Category is required."

    # Description
    if not description or not description.strip():
        errors["description"] = "Description is required."

    # Expense Date
    if not expense_date:
        errors["expense_date"] = "Expense date is required."
    else:
        try:
            datetime.strptime(expense_date, "%Y-%m-%d")
        except ValueError:
            errors["expense_date"] = "Expense date must be YYYY-MM-DD."

    return errors

def validate_income(data):
    errors = {}

    amount = data.get("amount")
    category = data.get("category")
    source = data.get("source")
    income_date = data.get("income_date")

    if amount is None:
        errors["amount"] = "Amount is required."
    else:
        try:
            amount = float(amount)
            if amount <= 0:
                errors["amount"] = "Amount must be greater than 0."
        except (ValueError, TypeError):
            errors["amount"] = "Amount must be a valid number."

    if not category or not category.strip():
        errors["category"] = "Category is required."

    if not source or not source.strip():
        errors["source"] = "Source is required."

    if not income_date:
        errors["income_date"] = "Income date is required."
    else:
        try:
            datetime.strptime(income_date, "%Y-%m-%d")
        except ValueError:
            errors["income_date"] = "Income date must be YYYY-MM-DD."

    return errors

def validate_budget(data):
    errors = {}

    amount = data.get("amount")
    category = data.get("category")
    month = data.get("month")
    year = data.get("year")

    if amount is None:
        errors["amount"] = "Amount is required."
    else:
        try:
            amount = float(amount)
            if amount <= 0:
                errors["amount"] = "Amount must be greater than 0."
        except (ValueError, TypeError):
            errors["amount"] = "Amount must be a valid number."

    if not category or not category.strip():
        errors["category"] = "Category is required."

    if month is None:
        errors["month"] = "Month is required."
    elif not (1 <= int(month) <= 12):
        errors["month"] = "Month must be between 1 and 12."

    if year is None:
        errors["year"] = "Year is required."
    elif int(year) < 2000:
        errors["year"] = "Year is invalid."

    return errors