from datetime import datetime


def validate_expense(data):
    """
    Validate expense request data.
    Category is optional because it can be predicted by AI.
    """

    errors = {}

    # Required fields
    required_fields = [
        "description",
        "amount",
        "expense_date"
    ]

    for field in required_fields:
        if field not in data or data[field] in [None, ""]:
            errors[field] = f"{field.replace('_', ' ').title()} is required."

    # Amount validation
    if "amount" in data:
        try:
            amount = float(data["amount"])
            if amount <= 0:
                errors["amount"] = "Amount must be greater than 0."
        except (ValueError, TypeError):
            errors["amount"] = "Amount must be a valid number."

    # Date validation
    if "expense_date" in data and data["expense_date"]:
        try:
            datetime.strptime(data["expense_date"], "%Y-%m-%d")
        except ValueError:
            errors["expense_date"] = "Expense date must be in YYYY-MM-DD format."

    return errors


def validate_income(data):
    """
    Validate income request data.
    """

    errors = {}

    required_fields = [
        "source",
        "category",
        "amount",
        "income_date"
    ]

    for field in required_fields:
        if field not in data or data[field] in [None, ""]:
            errors[field] = f"{field.replace('_', ' ').title()} is required."

    # Amount validation
    if "amount" in data:
        try:
            amount = float(data["amount"])
            if amount <= 0:
                errors["amount"] = "Amount must be greater than 0."
        except (ValueError, TypeError):
            errors["amount"] = "Amount must be a valid number."

    # Date validation
    if "income_date" in data and data["income_date"]:
        try:
            datetime.strptime(data["income_date"], "%Y-%m-%d")
        except ValueError:
            errors["income_date"] = "Income date must be in YYYY-MM-DD format."

    return errors


def validate_budget(data):
    """
    Validate budget request data.
    """

    errors = {}

    required_fields = [
        "category",
        "amount",
        "month",
        "year"
    ]

    for field in required_fields:
        if field not in data or data[field] in [None, ""]:
            errors[field] = f"{field.replace('_', ' ').title()} is required."

    # Amount validation
    if "amount" in data:
        try:
            amount = float(data["amount"])
            if amount <= 0:
                errors["amount"] = "Amount must be greater than 0."
        except (ValueError, TypeError):
            errors["amount"] = "Amount must be a valid number."

    # Month validation
    if "month" in data:
        try:
            month = int(data["month"])
            if month < 1 or month > 12:
                errors["month"] = "Month must be between 1 and 12."
        except (ValueError, TypeError):
            errors["month"] = "Month must be an integer."

    # Year validation
    if "year" in data:
        try:
            year = int(data["year"])
            if year < 2000:
                errors["year"] = "Year must be valid."
        except (ValueError, TypeError):
            errors["year"] = "Year must be an integer."

    return errors