import {
  Wallet,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

function BudgetCard({
  budget,
  spent = 0,
}) {
  if (!budget) return null;

  const amount = Number(
    budget.amount || 0
  );

  const spentAmount = Number(
    spent || 0
  );

  const remaining =
    amount - spentAmount;

  const percentage =
    amount > 0
      ? Math.min(
          (spentAmount / amount) * 100,
          100
        )
      : 0;

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month =
    Number(budget.month) >= 1 &&
    Number(budget.month) <= 12
      ? monthNames[
          Number(budget.month) - 1
        ]
      : "Monthly";

  const isOverBudget =
    spentAmount > amount;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Wallet size={20} />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-slate-900">
                {budget.category ||
                  "Other"}
              </h3>

              <p className="mt-0.5 text-sm text-slate-500">
                {month}{" "}
                {budget.year || ""}
              </p>
            </div>
          </div>
        </div>

        {/* Percentage */}
        <div
          className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold ${
            isOverBudget
              ? "bg-red-50 text-red-600"
              : "bg-blue-50 text-blue-600"
          }`}
        >
          {Math.round(percentage)}%
        </div>
      </div>

      {/* Amounts */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Budget
          </p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            ₹
            {amount.toLocaleString(
              "en-IN",
              {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }
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
              "en-IN",
              {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }
            )}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isOverBudget
                ? "bg-red-500"
                : "bg-blue-500"
            }`}
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      </div>

      {/* Remaining */}
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2">
          {isOverBudget ? (
            <TrendingDown
              size={17}
              className="text-red-500"
            />
          ) : (
            <TrendingUp
              size={17}
              className="text-emerald-500"
            />
          )}

          <span className="text-sm text-slate-500">
            {isOverBudget
              ? "Over budget"
              : "Remaining"}
          </span>
        </div>

        <span
          className={`text-sm font-bold ${
            isOverBudget
              ? "text-red-600"
              : "text-emerald-600"
          }`}
        >
          {isOverBudget ? "-" : ""}₹
          {Math.abs(
            remaining
          ).toLocaleString(
            "en-IN",
            {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }
          )}
        </span>
      </div>
    </div>
  );
}

export default BudgetCard;