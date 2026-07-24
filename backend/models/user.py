from datetime import datetime
from database import db


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(db.String(100), nullable=False)

    email = db.Column(db.String(120), unique=True, nullable=False)

    password = db.Column(db.String(255), nullable=False)

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    expenses = db.relationship(
        "Expense",
        back_populates="user",
        cascade="all, delete-orphan",
        lazy=True
    )

    incomes = db.relationship(
        "Income",
        back_populates="user",
        cascade="all, delete-orphan",
        lazy=True
    )

    budget = db.relationship(
        "Budget",
        back_populates="user",
        uselist=False,
        cascade="all, delete-orphan"
    )

    budgets = db.relationship(
        "Budget",
        back_populates="user",
        cascade="all, delete-orphan",
        lazy=True
    )
    def __repr__(self):
        return f"<User {self.email}>"