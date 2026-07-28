function BudgetProgress({
  spent = 0,
  budget = 0,
}) {
  const percentage =
    budget > 0
      ? Math.min((spent / budget) * 100, 100)
      : 0;

  const remaining = Math.max(
    budget - spent,
    0
  );

  let progressColor = "bg-green-500";
  let status = "On Track";

  if (percentage >= 100) {
    progressColor = "bg-red-500";
    status = "Over Budget";
  } else if (percentage >= 75) {
    progressColor = "bg-yellow-500";
    status = "Near Limit";
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-slate-500">
          Progress
        </span>

        <span className="font-semibold text-slate-700">
          {percentage.toFixed(0)}%
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-slate-600">
          Spent:
          <strong>
            {" "}
            ₹{Number(spent).toLocaleString("en-IN")}
          </strong>
        </span>

        <span className="text-slate-600">
          Remaining:
          <strong>
            {" "}
            ₹{remaining.toLocaleString("en-IN")}
          </strong>
        </span>
      </div>

      <div className="text-right">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
            percentage >= 100
              ? "bg-red-500"
              : percentage >= 75
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

export default BudgetProgress;