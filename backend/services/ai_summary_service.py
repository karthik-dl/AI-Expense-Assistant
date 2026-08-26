from services.financial_health_service import get_financial_health
from services.insights_service import get_spending_insights
from services.recommendation_service import get_budget_recommendations
from services.analytics_service import get_monthly_analytics


def calculate_prediction(
    monthly_analytics,
    current_income,
    current_expense
):
    active_months = []

    for item in monthly_analytics:
        income = float(item.get("income", 0) or 0)
        expense = float(item.get("expense", 0) or 0)

        if income > 0 or expense > 0:
            active_months.append({
                "income": income,
                "expense": expense
            })

    if not active_months:
        return {
            "predictedIncome": round(
                float(current_income or 0), 2
            ),
            "predictedExpense": round(
                float(current_expense or 0), 2
            ),
            "predictedSavings": round(
                float(current_income or 0)
                - float(current_expense or 0),
                2
            ),
            "confidence": 10,
            "risk": "Low"
        }

    recent_months = active_months[-3:]

    income_values = [
        item["income"]
        for item in recent_months
        if item["income"] > 0
    ]

    expense_values = [
        item["expense"]
        for item in recent_months
        if item["expense"] > 0
    ]

    if income_values:
        predicted_income = (
            sum(income_values) /
            len(income_values)
        )
    else:
        predicted_income = float(
            current_income or 0
        )

    if expense_values:
        predicted_expense = (
            sum(expense_values) /
            len(expense_values)
        )
    else:
        predicted_expense = float(
            current_expense or 0
        )

    if len(expense_values) >= 2:
        previous_expense = expense_values[-2]
        latest_expense = expense_values[-1]

        if previous_expense > 0:
            expense_growth = (
                latest_expense -
                previous_expense
            ) / previous_expense

            expense_growth = max(
                min(expense_growth, 0.25),
                -0.25
            )

            predicted_expense *= (
                1 + expense_growth
            )

    if len(income_values) >= 2:
        previous_income = income_values[-2]
        latest_income = income_values[-1]

        if previous_income > 0:
            income_growth = (
                latest_income -
                previous_income
            ) / previous_income

            income_growth = max(
                min(income_growth, 0.20),
                -0.20
            )

            predicted_income *= (
                1 + income_growth
            )

    predicted_income = round(
        predicted_income,
        2
    )

    predicted_expense = round(
        predicted_expense,
        2
    )

    predicted_savings = round(
        predicted_income -
        predicted_expense,
        2
    )

    month_count = len(active_months)

    if month_count >= 6:
        confidence = 90
    elif month_count >= 4:
        confidence = 80
    elif month_count >= 3:
        confidence = 70
    elif month_count == 2:
        confidence = 55
    else:
        confidence = 30

    if predicted_income <= 0:
        risk = "High"
    else:
        expense_ratio = (
            predicted_expense /
            predicted_income
        ) * 100

        if predicted_savings < 0:
            risk = "High"
        elif expense_ratio >= 80:
            risk = "High"
        elif expense_ratio >= 60:
            risk = "Medium"
        else:
            risk = "Low"

    return {
        "predictedIncome": predicted_income,
        "predictedExpense": predicted_expense,
        "predictedSavings": predicted_savings,
        "confidence": confidence,
        "risk": risk
    }


def generate_ai_summary(user_id):
    health_result = get_financial_health(user_id)

    if not health_result.get("success"):
        return health_result

    health = health_result.get(
        "health_score",
        {}
    )

    insights_result = get_spending_insights(
        user_id
    )

    if insights_result.get("success"):
        insights = insights_result.get(
            "insights",
            {}
        )
    else:
        insights = {
            "total_expenses": 0,
            "total_transactions": 0,
            "average_expense": 0,
            "largest_expense": None,
            "top_category": {
                "category": "None",
                "amount": 0
            }
        }

    budget_result = get_budget_recommendations(
        user_id
    )

    if budget_result.get("success"):
        recommendations = budget_result.get(
            "recommendations",
            []
        )
    else:
        recommendations = []

    analytics_result = get_monthly_analytics(
        user_id
    )

    monthly_analytics = analytics_result.get(
        "analytics",
        []
    )

    budget_alerts = []

    for item in recommendations:
        status = item.get(
            "status",
            ""
        )

        budget = float(
            item.get("budget", 0) or 0
        )

        spent = float(
            item.get("spent", 0) or 0
        )

        percentage = 0

        if budget > 0:
            percentage = round(
                (spent / budget) * 100,
                2
            )

        if status == "Exceeded":
            budget_alerts.append({
                "category": item.get(
                    "category",
                    "Unknown"
                ),
                "budget": budget,
                "spent": spent,
                "percentage": percentage,
                "status": "danger",
                "message": item.get(
                    "message",
                    "Budget exceeded."
                )
            })

        elif status == "Warning":
            budget_alerts.append({
                "category": item.get(
                    "category",
                    "Unknown"
                ),
                "budget": budget,
                "spent": spent,
                "percentage": percentage,
                "status": "warning",
                "message": item.get(
                    "message",
                    "Budget is close to its limit."
                )
            })

    spending_insights = []

    top_category = insights.get(
        "top_category",
        {
            "category": "None",
            "amount": 0
        }
    )

    top_category_name = top_category.get(
        "category",
        "None"
    )

    top_category_amount = float(
        top_category.get(
            "amount",
            0
        ) or 0
    )

    if top_category_name != "None":
        spending_insights.append({
            "type": "warning",
            "title": "Highest Spending Category",
            "description": (
                f"{top_category_name} is your "
                f"highest spending category with "
                f"₹{top_category_amount:,.2f} spent."
            )
        })

    largest_expense = insights.get(
        "largest_expense"
    )

    if largest_expense:
        largest_amount = float(
            largest_expense.get(
                "amount",
                0
            ) or 0
        )

        largest_description = largest_expense.get(
            "description",
            "an expense"
        )

        spending_insights.append({
            "type": "warning",
            "title": "Largest Expense",
            "description": (
                f"Your largest expense was "
                f"₹{largest_amount:,.2f} "
                f"for {largest_description}."
            )
        })

    savings_rate = float(
        health.get(
            "savings_rate",
            0
        ) or 0
    )

    if savings_rate >= 20:
        spending_insights.append({
            "type": "positive",
            "title": "Healthy Savings",
            "description": (
                f"You are saving "
                f"{savings_rate:.2f}% of your income."
            )
        })

    elif savings_rate < 10:
        spending_insights.append({
            "type": "negative",
            "title": "Low Savings Rate",
            "description": (
                f"Your current savings rate is "
                f"{savings_rate:.2f}%. Consider "
                f"reducing unnecessary expenses."
            )
        })

    savings_suggestions = []

    income = float(
        health.get(
            "income",
            0
        ) or 0
    )

    savings = float(
        health.get(
            "savings",
            0
        ) or 0
    )

    if savings_rate < 20:
        target_savings = income * 0.20

        potential_saving = round(
            max(
                target_savings - savings,
                0
            ),
            2
        )

        savings_suggestions.append({
            "type": "saving",
            "title": "Increase Your Savings",
            "description": (
                "Try to target at least 20% "
                "of your income as savings."
            ),
            "potentialSaving": potential_saving
        })

    else:
        savings_suggestions.append({
            "type": "saving",
            "title": "Maintain Your Savings",
            "description": (
                "Your current savings rate is healthy. "
                "Continue maintaining this habit."
            ),
            "potentialSaving": 0
        })

    if budget_alerts:
        savings_suggestions.append({
            "type": "budget",
            "title": "Control Budget Overruns",
            "description": (
                "Reducing spending in categories "
                "that exceed their budgets can "
                "increase your monthly savings."
            ),
            "potentialSaving": 0
        })

    score = float(
        health.get(
            "score",
            0
        ) or 0
    )

    status = health.get(
        "status",
        "Unknown"
    )

    expense = float(
        health.get(
            "expense",
            0
        ) or 0
    )

    summary_parts = []

    summary_parts.append(
        f"Your financial health score is "
        f"{score:.0f}/100 ({status})."
    )

    summary_parts.append(
        f"You earned ₹{income:,.2f} "
        f"and spent ₹{expense:,.2f}."
    )

    summary_parts.append(
        f"Your current savings are "
        f"₹{savings:,.2f}, with a savings rate "
        f"of {savings_rate:.2f}%."
    )

    if top_category_name != "None":
        summary_parts.append(
            f"Your highest spending category "
            f"is {top_category_name}."
        )

    exceeded_categories = [
        item.get(
            "category",
            "Unknown"
        )
        for item in budget_alerts
        if item.get("status") == "danger"
    ]

    if exceeded_categories:
        summary_parts.append(
            "You have exceeded your budget in: "
            + ", ".join(exceeded_categories)
            + "."
        )

    elif budget_alerts:
        summary_parts.append(
            "Some of your budgets are close "
            "to their spending limits."
        )

    else:
        summary_parts.append(
            "Your budgets are currently "
            "under control."
        )

    advice = health.get(
        "advice",
        ""
    )

    if advice:
        summary_parts.append(advice)

    ai_summary = " ".join(
        summary_parts
    )

    prediction = calculate_prediction(
        monthly_analytics=monthly_analytics,
        current_income=income,
        current_expense=expense
    )

    return {
        "success": True,
        "financialScore": score,
        "healthMessage": advice,
        "totalIncome": income,
        "totalExpense": expense,
        "savings": savings,
        "savingsRate": savings_rate,
        "aiSummary": ai_summary,
        "spendingInsights": spending_insights,
        "budgetAlerts": budget_alerts,
        "savingsSuggestions": savings_suggestions,
        "monthlyAnalytics": monthly_analytics,
        "rawHealth": health,
        "rawInsights": insights,
        "recommendations": recommendations,
        "prediction": prediction
    }