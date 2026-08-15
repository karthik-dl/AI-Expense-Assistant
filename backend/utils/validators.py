from datetime import datetime


# ============================================================
# EXPENSE VALIDATION
# ============================================================

def validate_expense(data):
    errors = {}

    if not data:
        return {
            "general": "Request body is required"
        }

    # Description
    description = data.get("description")

    if not description:
        errors["description"] = (
            "Description is required"
        )
    elif not isinstance(description, str):
        errors["description"] = (
            "Description must be a string"
        )
    elif not description.strip():
        errors["description"] = (
            "Description cannot be empty"
        )
    elif len(description.strip()) > 255:
        errors["description"] = (
            "Description must not exceed 255 characters"
        )

    # Amount
    amount = data.get("amount")

    if amount is None:
        errors["amount"] = (
            "Amount is required"
        )
    else:
        try:
            amount_value = float(amount)

            if amount_value <= 0:
                errors["amount"] = (
                    "Amount must be greater than 0"
                )

        except (TypeError, ValueError):
            errors["amount"] = (
                "Amount must be a valid number"
            )

    # Category is optional because the
    # controller can predict it using AI.
    category = data.get("category")

    if category is not None:
        if not isinstance(category, str):
            errors["category"] = (
                "Category must be a string"
            )
        elif len(category.strip()) > 100:
            errors["category"] = (
                "Category must not exceed 100 characters"
            )

    # Expense date
    expense_date = data.get("expense_date")

    if not expense_date:
        errors["expense_date"] = (
            "Expense date is required"
        )
    else:
        try:
            datetime.strptime(
                expense_date,
                "%Y-%m-%d"
            )
        except (TypeError, ValueError):
            errors["expense_date"] = (
                "Expense date must be in YYYY-MM-DD format"
            )

    return errors


# ============================================================
# INCOME VALIDATION
# ============================================================

def validate_income(data):
    errors = {}

    if not data:
        return {
            "general": "Request body is required"
        }

    # Source
    source = data.get("source")

    if not source:
        errors["source"] = (
            "Income source is required"
        )
    elif not isinstance(source, str):
        errors["source"] = (
            "Income source must be a string"
        )
    elif not source.strip():
        errors["source"] = (
            "Income source cannot be empty"
        )
    elif len(source.strip()) > 150:
        errors["source"] = (
            "Income source must not exceed 150 characters"
        )

    # Category
    category = data.get("category")

    if not category:
        errors["category"] = (
            "Category is required"
        )
    elif not isinstance(category, str):
        errors["category"] = (
            "Category must be a string"
        )
    elif not category.strip():
        errors["category"] = (
            "Category cannot be empty"
        )
    elif len(category.strip()) > 100:
        errors["category"] = (
            "Category must not exceed 100 characters"
        )

    # Amount
    amount = data.get("amount")

    if amount is None:
        errors["amount"] = (
            "Amount is required"
        )
    else:
        try:
            amount_value = float(amount)

            if amount_value <= 0:
                errors["amount"] = (
                    "Amount must be greater than 0"
                )

        except (TypeError, ValueError):
            errors["amount"] = (
                "Amount must be a valid number"
            )

    # Income date
    income_date = data.get("income_date")

    if not income_date:
        errors["income_date"] = (
            "Income date is required"
        )
    else:
        try:
            datetime.strptime(
                income_date,
                "%Y-%m-%d"
            )
        except (TypeError, ValueError):
            errors["income_date"] = (
                "Income date must be in YYYY-MM-DD format"
            )

    # Notes
    notes = data.get("notes")

    if notes is not None:
        if not isinstance(notes, str):
            errors["notes"] = (
                "Notes must be a string"
            )
        elif len(notes) > 5000:
            errors["notes"] = (
                "Notes must not exceed 5000 characters"
            )

    return errors


# ============================================================
# BUDGET VALIDATION
# ============================================================

def validate_budget(data):
    errors = {}

    if not data:
        return {
            "general": "Request body is required"
        }

    # Category
    category = data.get("category")

    if not category:
        errors["category"] = (
            "Category is required"
        )
    elif not isinstance(category, str):
        errors["category"] = (
            "Category must be a string"
        )
    elif not category.strip():
        errors["category"] = (
            "Category cannot be empty"
        )
    elif len(category.strip()) > 100:
        errors["category"] = (
            "Category must not exceed 100 characters"
        )

    # Amount
    amount = data.get("amount")

    if amount is None:
        errors["amount"] = (
            "Amount is required"
        )
    else:
        try:
            amount_value = float(amount)

            if amount_value <= 0:
                errors["amount"] = (
                    "Amount must be greater than 0"
                )

        except (TypeError, ValueError):
            errors["amount"] = (
                "Amount must be a valid number"
            )

    # Month
    month = data.get("month")

    if month is None:
        errors["month"] = (
            "Month is required"
        )
    else:
        try:
            month_value = int(month)

            if month_value < 1 or month_value > 12:
                errors["month"] = (
                    "Month must be between 1 and 12"
                )

        except (TypeError, ValueError):
            errors["month"] = (
                "Month must be a valid integer"
            )

    # Year
    year = data.get("year")

    if year is None:
        errors["year"] = (
            "Year is required"
        )
    else:
        try:
            year_value = int(year)

            if year_value < 2000 or year_value > 2100:
                errors["year"] = (
                    "Year must be between 2000 and 2100"
                )

        except (TypeError, ValueError):
            errors["year"] = (
                "Year must be a valid integer"
            )

    return errors