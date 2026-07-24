from datetime import datetime
from database import db


class Expense(db.Model):
    __tablename__ = "expenses"

    id = db.Column(db.Integer, primary_key=True)

    description = db.Column(db.String(255), nullable=False)

    amount = db.Column(db.Float, nullable=False)

    category = db.Column(db.String(100), nullable=False)

    expense_date = db.Column(
        db.Date,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

   
    user = db.relationship(
        "User",
        back_populates="expenses"
    )

    def __repr__(self):
        return f"<Expense {self.description}>"