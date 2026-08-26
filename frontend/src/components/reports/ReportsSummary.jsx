import Card from "../ui/Card";

function ReportsSummary({ summary = {} }) {
  const totalIncome = Number(
    summary?.totalIncome || 0
  );

  const totalExpense = Number(
    summary?.totalExpense || 0
  );

  const netSavings =
    totalIncome - totalExpense;

  const savingsRate =
    totalIncome > 0
      ? (netSavings / totalIncome) * 100
      : 0;

  const isPositiveSavings =
    netSavings >= 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {/* Income */}
      <Card hover={false}>
        <p className="text-sm font-medium text-slate-500">
          Total Income
        </p>

        <p className="mt-2 text-2xl font-bold text-emerald-600 sm:text-3xl">
          ₹
          {totalIncome.toLocaleString(
            "en-IN"
          )}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Total income for selected period
        </p>
      </Card>

      {/* Expenses */}
      <Card hover={false}>
        <p className="text-sm font-medium text-slate-500">
          Total Expenses
        </p>

        <p className="mt-2 text-2xl font-bold text-red-600 sm:text-3xl">
          ₹
          {totalExpense.toLocaleString(
            "en-IN"
          )}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Total spending for selected period
        </p>
      </Card>

      {/* Savings */}
      <Card hover={false}>
        <p className="text-sm font-medium text-slate-500">
          Net Savings
        </p>

        <p
          className={`mt-2 text-2xl font-bold sm:text-3xl ${
            isPositiveSavings
              ? "text-blue-600"
              : "text-red-600"
          }`}
        >
          ₹
          {netSavings.toLocaleString(
            "en-IN"
          )}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Income minus expenses
        </p>
      </Card>

      {/* Savings Rate */}
      <Card hover={false}>
        <p className="text-sm font-medium text-slate-500">
          Savings Rate
        </p>

        <p
          className={`mt-2 text-2xl font-bold sm:text-3xl ${
            savingsRate >= 20
              ? "text-emerald-600"
              : savingsRate >= 10
              ? "text-amber-500"
              : "text-red-500"
          }`}
        >
          {savingsRate.toFixed(1)}%
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Percentage of income saved
        </p>
      </Card>

    </div>
  );
}

export default ReportsSummary;