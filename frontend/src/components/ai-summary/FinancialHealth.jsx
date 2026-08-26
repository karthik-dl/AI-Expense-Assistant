import Card from "../ui/Card";

function FinancialHealth({ summary }) {
  const score = Number(
    summary?.financialScore || 0
  );

  const healthMessage =
    summary?.healthMessage ||
    "Keep tracking your income and expenses to improve your financial health.";

  const circumference =
    2 * Math.PI * 54;

  const safeScore = Math.min(
    Math.max(score, 0),
    100
  );

  const offset =
    circumference -
    (safeScore / 100) * circumference;

  let badgeClass =
    "bg-red-100 text-red-600";

  let badgeText =
    "Needs Improvement";

  if (score >= 80) {
    badgeClass =
      "bg-green-100 text-green-700";

    badgeText = "Excellent";
  } else if (score >= 60) {
    badgeClass =
      "bg-yellow-100 text-yellow-700";

    badgeText = "Good";
  } else if (score >= 40) {
    badgeClass =
      "bg-orange-100 text-orange-700";

    badgeText = "Fair";
  }

  return (
    <Card>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-slate-800">
          Financial Health
        </h2>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${badgeClass}`}
        >
          {badgeText}
        </span>
      </div>

      {/* Score Circle */}
      <div className="flex flex-col items-center">
        <div className="relative h-35 w-35">
          <svg
            width="140"
            height="140"
            className="-rotate-90"
          >
            {/* Background */}
            <circle
              cx="70"
              cy="70"
              r="54"
              stroke="#E2E8F0"
              strokeWidth="10"
              fill="none"
            />

            {/* Progress */}
            <circle
              cx="70"
              cy="70"
              r="54"
              stroke="#2563EB"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{
                transition:
                  "stroke-dashoffset 0.8s ease",
              }}
            />
          </svg>

          {/* Score */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h3 className="text-4xl font-bold text-slate-800">
              {safeScore}
            </h3>

            <p className="text-sm text-slate-500">
              out of 100
            </p>
          </div>
        </div>
      </div>

      {/* AI Insight */}
      <div className="mt-8 rounded-2xl bg-slate-50 p-4">
        <h4 className="mb-2 font-semibold text-slate-700">
          AI Insight
        </h4>

        <p className="leading-7 text-slate-600">
          {healthMessage}
        </p>
      </div>
    </Card>
  );
}

export default FinancialHealth;