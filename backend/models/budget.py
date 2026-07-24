# from datetime import datetime
# from database import db


# class Budget(db.Model):
#     __tablename__ = "budgets"

#     id = db.Column(db.Integer, primary_key=True)

#     monthly_budget = db.Column(
#         db.Float,
#         nullable=False
#     )

#     month = db.Column(
#         db.Integer,
#         nullable=False
#     )

#     year = db.Column(
#         db.Integer,
#         nullable=False
#     )

#     created_at = db.Column(
#         db.DateTime,
#         default=datetime.utcnow
#     )

#     user_id = db.Column(
#         db.Integer,
#         db.ForeignKey("users.id"),
#         unique=True,
#         nullable=False
#     )


#     user = db.relationship(
#         "User",
#         back_populates="budget"
#     )

#     def __repr__(self):
#         return f"<Budget {self.month}/{self.year}>"

from datetime import datetime
from database import db


class Budget(db.Model):
    __tablename__ = "budgets"

    id = db.Column(db.Integer, primary_key=True)

    category = db.Column(
        db.String(100),
        nullable=False
    )

    amount = db.Column(
        db.Numeric(10, 2),
        nullable=False
    )

    month = db.Column(
        db.Integer,
        nullable=False
    )

    year = db.Column(
        db.Integer,
        nullable=False
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
        back_populates="budgets"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "category": self.category,
            "amount": float(self.amount),
            "month": self.month,
            "year": self.year,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "user_id": self.user_id
        }