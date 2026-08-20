import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
} from "lucide-react";

function BudgetProgress({
  budget,
  spent = 0,
}) {
  if (!budget) {
    return null;
  }

  const budgetAmount = Number(
    budget.amount || 0
  );

  const spentAmount = Number(
    spent || 0
  );

  const remaining =
    budgetAmount - spentAmount;

  const utilization =
    budgetAmount > 0
      ? (spentAmount / budgetAmount) * 100
      : 0;

  const isOverBudget =
    spentAmount > budgetAmount;

  const progressWidth =
    Math.min(utilization, 100);

  let progressClass =
    "bg-emerald-500";

  if (utilization >= 100) {
    progressClass = "bg-red-500";
  } else if (utilization >= 80) {
    progressClass = "bg-orange-500";
  } else if (utilization >= 60) {
    progressClass = "bg-yellow-500";
  }

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            {budget.category || "Budget"}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Monthly spending progress
          </p>
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            isOverBudget
              ? "bg-red-50 text-red-600"
              : "bg-emerald-50 text-emerald-600"
          }`}
        >
          {isOverBudget ? (
            <AlertTriangle size={20} />
          ) : (
            <TrendingUp size={20} />
          )}
        </div>
      </div>

      {/* Amounts */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Budget
          </p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            ₹
            {budgetAmount.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500">
            Spent
          </p>

          <p
            className={`mt-1 text-lg font-bold ${
              isOverBudget
                ? "text-red-600"
                : "text-orange-600"
            }`}
          >
            ₹
            {spentAmount.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-slate-500">
            {isOverBudget
              ? "Exceeded"
              : "Remaining"}
          </p>

          <p
            className={`mt-1 text-lg font-bold ${
              isOverBudget
                ? "text-red-600"
                : "text-emerald-600"
            }`}
          >
            ₹
            {Math.abs(
              remaining
            ).toLocaleString(
              "en-IN"
            )}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">
            Spending Progress
          </span>

          <span
            className={`text-sm font-bold ${
              isOverBudget
                ? "text-red-600"
                : "text-slate-900"
            }`}
          >
            {utilization.toFixed(1)}%
          </span>
        </div>

        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressClass}`}
            style={{
              width: `${progressWidth}%`,
            }}
          />
        </div>
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center gap-2">
        {isOverBudget ? (
          <>
            <TrendingDown
              size={16}
              className="text-red-500"
            />

            <p className="text-sm font-medium text-red-600">
              You have exceeded this budget.
            </p>
          </>
        ) : utilization >= 80 ? (
          <>
            <AlertTriangle
              size={16}
              className="text-orange-500"
            />

            <p className="text-sm font-medium text-orange-600">
              You are close to your budget limit.
            </p>
          </>
        ) : (
          <>
            <TrendingUp
              size={16}
              className="text-emerald-500"
            />

            <p className="text-sm font-medium text-emerald-600">
              Your spending is within the budget.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default BudgetProgress;