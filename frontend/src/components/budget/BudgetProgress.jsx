function BudgetProgress({
  spent = 0,
  budget = 0,
}) {
  const numericSpent =
    Number(spent) || 0;

  const numericBudget =
    Number(budget) || 0;

  const percentage =
    numericBudget > 0
      ? (numericSpent /
          numericBudget) *
        100
      : 0;

  const displayPercentage =
    Math.round(percentage);

  const remaining =
    numericBudget - numericSpent;

  const isOverBudget =
    percentage >= 100;

  const isNearLimit =
    percentage >= 75 &&
    percentage < 100;

  let progressColor =
    "bg-emerald-500";

  let status = "On Track";

  let statusClass =
    "bg-emerald-50 text-emerald-700";

  if (isOverBudget) {
    progressColor = "bg-red-500";
    status = "Over Budget";
    statusClass =
      "bg-red-50 text-red-700";
  } else if (isNearLimit) {
    progressColor = "bg-amber-500";
    status = "Near Limit";
    statusClass =
      "bg-amber-50 text-amber-700";
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-medium text-slate-500">
          Spending Progress
        </span>

        <span className="text-xs font-semibold text-slate-700">
          {displayPercentage}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
          style={{
            width: `${Math.min(
              percentage,
              100
            )}%`,
          }}
        />
      </div>

      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="min-w-0 truncate text-slate-500">
          Spent{" "}
          <strong className="text-slate-700">
            ₹
            {numericSpent.toLocaleString(
              "en-IN"
            )}
          </strong>
        </span>

        <span
          className={`min-w-0 truncate font-medium ${
            remaining >= 0
              ? "text-slate-500"
              : "text-red-600"
          }`}
        >
          {remaining >= 0
            ? "Remaining "
            : "Over by "}
          <strong>
            ₹
            {Math.abs(
              remaining
            ).toLocaleString(
              "en-IN"
            )}
          </strong>
        </span>
      </div>

      <div>
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

export default BudgetProgress;