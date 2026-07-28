import { Link } from "react-router-dom";
import { Pencil, Trash2, Wallet } from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";
import BudgetProgress from "./BudgetProgress";

function BudgetCard({
  budget,
  onDelete,
}) {
  const budgetAmount = Number(budget.amount || 0);
  const spentAmount = Number(budget.spent || 0);
  const remaining = budgetAmount - spentAmount;

  return (
    <Card className="space-y-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-100 p-3">
            <Wallet
              size={22}
              className="text-blue-600"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800">
              {budget.category}
            </h3>

            <p className="text-sm text-slate-500">
              {budget.month}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-slate-500">
            Budget
          </p>

          <p className="mt-1 font-bold text-blue-600">
            ₹{budgetAmount.toLocaleString("en-IN")}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Spent
          </p>

          <p className="mt-1 font-bold text-red-500">
            ₹{spentAmount.toLocaleString("en-IN")}
          </p>
        </div>

        <div>
          <p className="text-xs text-slate-500">
            Remaining
          </p>

          <p
            className={`mt-1 font-bold ${
              remaining >= 0
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            ₹{remaining.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <BudgetProgress
        spent={spentAmount}
        budget={budgetAmount}
      />

      <div className="flex gap-3 pt-2">
        <Link
          to={`/budgets/${budget.id}/edit`}
          className="flex-1"
        >
          <Button
            variant="secondary"
            className="w-full"
          >
            <Pencil size={16} />
            Edit
          </Button>
        </Link>

        <Button
          variant="danger"
          onClick={() => onDelete(budget)}
          className="flex-1"
        >
          <Trash2 size={16} />
          Delete
        </Button>
      </div>
    </Card>
  );
}

export default BudgetCard;