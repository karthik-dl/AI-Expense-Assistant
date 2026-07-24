from datetime import datetime
from database import db


class Income(db.Model):
    __tablename__ = "incomes"

    id = db.Column(db.Integer, primary_key=True)

    source = db.Column(
        db.String(150),
        nullable=False
    )

    category = db.Column(
        db.String(100),
        nullable=False,
        default="Other"
    )

    amount = db.Column(
        db.Numeric(10, 2),
        nullable=False
    )

    income_date = db.Column(
        db.Date,
        nullable=False
    )

    notes = db.Column(
        db.Text,
        nullable=True
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    user = db.relationship(
        "User",
        back_populates="incomes"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "source": self.source,
            "category": self.category,
            "amount": float(self.amount),
            "income_date": self.income_date.isoformat(),
            "notes": self.notes,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "user_id": self.user_id
        }