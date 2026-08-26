import csv
import io
from datetime import datetime

from flask import jsonify, request, Response
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from sqlalchemy import extract

from models.income import Income
from models.expense import Expense

from services.report_service import (
    get_monthly_report,
    get_yearly_report,
    get_category_analysis,
    get_cash_flow,
    get_top_expenses,
    get_savings_analysis
)


@jwt_required()
def monthly_report():

    month = request.args.get(
        "month",
        type=int
    )

    year = request.args.get(
        "year",
        type=int
    )

    if not month or not year:
        return jsonify({
            "success": False,
            "message":
                "month and year are required"
        }), 400

    user_id = get_jwt_identity()

    result = get_monthly_report(
        user_id,
        month,
        year
    )

    return jsonify(result), 200


@jwt_required()
def yearly_report():

    year = request.args.get(
        "year",
        type=int
    )

    if not year:
        return jsonify({
            "success": False,
            "message": "year is required"
        }), 400

    user_id = get_jwt_identity()

    result = get_yearly_report(
        user_id,
        year
    )

    return jsonify(result), 200


@jwt_required()
def category_analysis():

    month = request.args.get(
        "month",
        type=int
    )

    year = request.args.get(
        "year",
        type=int
    )

    if not month or not year:
        return jsonify({
            "success": False,
            "message":
                "month and year are required"
        }), 400

    user_id = get_jwt_identity()

    result = get_category_analysis(
        user_id,
        month,
        year
    )

    return jsonify(result), 200


@jwt_required()
def cash_flow():

    year = request.args.get(
        "year",
        type=int
    )

    if not year:
        return jsonify({
            "success": False,
            "message": "year is required"
        }), 400

    user_id = get_jwt_identity()

    result = get_cash_flow(
        user_id,
        year
    )

    return jsonify(result), 200


@jwt_required()
def top_expenses():

    limit = request.args.get(
        "limit",
        default=5,
        type=int
    )

    user_id = get_jwt_identity()

    result = get_top_expenses(
        user_id,
        limit
    )

    return jsonify(result), 200


@jwt_required()
def savings_analysis():

    year = request.args.get(
        "year",
        type=int
    )

    if not year:
        return jsonify({
            "success": False,
            "message": "year is required"
        }), 400

    user_id = get_jwt_identity()

    result = get_savings_analysis(
        user_id,
        year
    )

    return jsonify(result), 200


# ============================================================
# CSV EXPORT
# ============================================================

@jwt_required()
def export_csv():

    user_id = get_jwt_identity()

    month = request.args.get(
        "month",
        type=int
    )

    year = request.args.get(
        "year",
        type=int
    )

    if not year:
        year = datetime.now().year

    try:

        income_query = Income.query.filter_by(
            user_id=user_id
        )

        expense_query = Expense.query.filter_by(
            user_id=user_id
        )

        # Year filter
        income_query = income_query.filter(
            extract(
                "year",
                Income.income_date
            ) == year
        )

        expense_query = expense_query.filter(
            extract(
                "year",
                Expense.expense_date
            ) == year
        )

        # Month filter
        if month:

            income_query = income_query.filter(
                extract(
                    "month",
                    Income.income_date
                ) == month
            )

            expense_query = expense_query.filter(
                extract(
                    "month",
                    Expense.expense_date
                ) == month
            )

        incomes = income_query.all()
        expenses = expense_query.all()

        output = io.StringIO()

        writer = csv.writer(output)

        # CSV Header
        writer.writerow([
            "Type",
            "Category",
            "Description",
            "Amount",
            "Date",
            "Notes"
        ])

        # Income
        for income in incomes:

            writer.writerow([
                "Income",
                income.category,
                income.source,
                float(income.amount),
                str(income.income_date),
                income.notes or ""
            ])

        # Expense
        for expense in expenses:

            writer.writerow([
                "Expense",
                expense.category,
                expense.description,
                float(expense.amount),
                str(expense.expense_date),
                ""
            ])

        output.seek(0)

        return Response(
            output.getvalue(),
            mimetype="text/csv",
            headers={
                "Content-Disposition":
                    "attachment; filename=financial-report.csv"
            }
        )

    except Exception as error:

        print(
            "CSV Export Error:",
            error
        )

        return jsonify({
            "success": False,
            "message":
                "Failed to export CSV report."
        }), 500


# ============================================================
# PDF EXPORT
# ============================================================

@jwt_required()
def export_pdf():

    user_id = get_jwt_identity()

    month = request.args.get(
        "month",
        type=int
    )

    year = request.args.get(
        "year",
        type=int
    )

    if not year:
        year = datetime.now().year

    try:

        from reportlab.lib.pagesizes import A4  # type: ignore[reportMissingImports]
        from reportlab.platypus import (  # type: ignore[reportMissingImports]
            SimpleDocTemplate,
            Paragraph,
            Spacer,
            Table,
            TableStyle
        )
        from reportlab.lib import colors  # type: ignore[reportMissingImports]
        from reportlab.lib.styles import (  # type: ignore[reportMissingImports]
            getSampleStyleSheet
        )

        income_query = Income.query.filter_by(
            user_id=user_id
        )

        expense_query = Expense.query.filter_by(
            user_id=user_id
        )

        # Year filter
        income_query = income_query.filter(
            extract(
                "year",
                Income.income_date
            ) == year
        )

        expense_query = expense_query.filter(
            extract(
                "year",
                Expense.expense_date
            ) == year
        )

        # Month filter
        if month:

            income_query = income_query.filter(
                extract(
                    "month",
                    Income.income_date
                ) == month
            )

            expense_query = expense_query.filter(
                extract(
                    "month",
                    Expense.expense_date
                ) == month
            )

        incomes = income_query.all()
        expenses = expense_query.all()

        total_income = sum(
            float(item.amount)
            for item in incomes
        )

        total_expense = sum(
            float(item.amount)
            for item in expenses
        )

        net_savings = (
            total_income -
            total_expense
        )

        buffer = io.BytesIO()

        document = SimpleDocTemplate(
            buffer,
            pagesize=A4,
            rightMargin=40,
            leftMargin=40,
            topMargin=40,
            bottomMargin=40
        )

        styles = getSampleStyleSheet()

        story = []

        # Title
        story.append(
            Paragraph(
                "Financial Report",
                styles["Title"]
            )
        )

        story.append(
            Spacer(1, 12)
        )

        # Period
        if month:

            period = (
                f"Month: {month} / "
                f"Year: {year}"
            )

        else:

            period = (
                f"Year: {year}"
            )

        story.append(
            Paragraph(
                period,
                styles["Normal"]
            )
        )

        story.append(
            Spacer(1, 20)
        )

        # Summary
        summary_data = [
            [
                "Metric",
                "Amount"
            ],
            [
                "Total Income",
                f"₹{total_income:,.2f}"
            ],
            [
                "Total Expenses",
                f"₹{total_expense:,.2f}"
            ],
            [
                "Net Savings",
                f"₹{net_savings:,.2f}"
            ]
        ]

        summary_table = Table(
            summary_data,
            colWidths=[
                250,
                150
            ]
        )

        summary_table.setStyle(
            TableStyle([
                (
                    "BACKGROUND",
                    (0, 0),
                    (-1, 0),
                    colors.HexColor(
                        "#2563EB"
                    )
                ),
                (
                    "TEXTCOLOR",
                    (0, 0),
                    (-1, 0),
                    colors.white
                ),
                (
                    "FONTNAME",
                    (0, 0),
                    (-1, 0),
                    "Helvetica-Bold"
                ),
                (
                    "GRID",
                    (0, 0),
                    (-1, -1),
                    0.5,
                    colors.grey
                ),
                (
                    "PADDING",
                    (0, 0),
                    (-1, -1),
                    8
                )
            ])
        )

        story.append(
            summary_table
        )

        story.append(
            Spacer(1, 25)
        )

        # Transactions
        story.append(
            Paragraph(
                "Transactions",
                styles["Heading2"]
            )
        )

        story.append(
            Spacer(1, 10)
        )

        transaction_data = [
            [
                "Type",
                "Category",
                "Amount",
                "Date"
            ]
        ]

        for income in incomes:

            transaction_data.append([
                "Income",
                income.category,
                f"₹{float(income.amount):,.2f}",
                str(income.income_date)
            ])

        for expense in expenses:

            transaction_data.append([
                "Expense",
                expense.category,
                f"₹{float(expense.amount):,.2f}",
                str(expense.expense_date)
            ])

        if len(transaction_data) == 1:

            transaction_data.append([
                "-",
                "No transactions",
                "-",
                "-"
            ])

        transaction_table = Table(
            transaction_data,
            repeatRows=1
        )

        transaction_table.setStyle(
            TableStyle([
                (
                    "BACKGROUND",
                    (0, 0),
                    (-1, 0),
                    colors.HexColor(
                        "#334155"
                    )
                ),
                (
                    "TEXTCOLOR",
                    (0, 0),
                    (-1, 0),
                    colors.white
                ),
                (
                    "FONTNAME",
                    (0, 0),
                    (-1, 0),
                    "Helvetica-Bold"
                ),
                (
                    "GRID",
                    (0, 0),
                    (-1, -1),
                    0.5,
                    colors.grey
                ),
                (
                    "PADDING",
                    (0, 0),
                    (-1, -1),
                    6
                )
            ])
        )

        story.append(
            transaction_table
        )

        document.build(story)

        buffer.seek(0)

        return Response(
            buffer.getvalue(),
            mimetype="application/pdf",
            headers={
                "Content-Disposition":
                    "attachment; filename=financial-report.pdf"
            }
        )

    except ImportError:

        return jsonify({
            "success": False,
            "message":
                "ReportLab is not installed. Run: pip install reportlab"
        }), 500

    except Exception as error:

        print(
            "PDF Export Error:",
            error
        )

        return jsonify({
            "success": False,
            "message":
                "Failed to export PDF report."
        }), 500