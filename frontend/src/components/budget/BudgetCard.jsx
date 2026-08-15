import { Link } from "react-router-dom";
import {
  Pencil,
  Trash2,
  Wallet,
} from "lucide-react";

import Button from "../ui/Button";
import BudgetProgress from "./BudgetProgress";

function BudgetCard({
  budget,
  onDelete,
}) {
  const budgetAmount = Number(
    budget?.amount || 0
  );

  const spentAmount = Number(
    budget?.spent || 0
  );

  const remaining =
    budgetAmount - spentAmount;

  return (
    <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md">
      {/* Header */}
      <div className="flex min-w-0 items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Wallet size={21} />
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-slate-900">
              {budget?.category ||
                "Budget"}
            </h3>

            <p className="mt-0.5 text-sm text-slate-500">
              {budget?.month ||
                "Monthly budget"}
            </p>
          </div>
        </div>
      </div>

      {/* Amounts */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500">
            Budget
          </p>

          <p className="mt-1 truncate text-sm font-bold text-blue-600">
            ₹
            {budgetAmount.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500">
            Spent
          </p>

          <p className="mt-1 truncate text-sm font-bold text-red-600">
            ₹
            {spentAmount.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium text-slate-500">
            Remaining
          </p>

          <p
            className={`mt-1 truncate text-sm font-bold ${
              remaining >= 0
                ? "text-emerald-600"
                : "text-red-600"
            }`}
          >
            ₹
            {remaining.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6 border-t border-slate-100 pt-5">
        <BudgetProgress
          spent={spentAmount}
          budget={budgetAmount}
        />
      </div>

      {/* Actions */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Link
          to={`/budgets/${budget.id}/edit`}
          className="min-w-0"
        >
          <Button
            type="button"
            variant="outline"
            className="w-full"
            leftIcon={
              <Pencil size={15} />
            }
          >
            Edit
          </Button>
        </Link>

        <Button
          type="button"
          variant="danger"
          className="w-full"
          leftIcon={
            <Trash2 size={15} />
          }
          onClick={() =>
            onDelete?.(budget)
          }
        >
          Delete
        </Button>
      </div>
    </article>
  );
}

export default BudgetCard;