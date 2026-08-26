import Card from "../ui/Card";

function SummaryCard({ summary }) {
  const totalIncome = Number(
    summary?.totalIncome || 0
  );

  const totalExpense = Number(
    summary?.totalExpense || 0
  );

  const netSavings =
    totalIncome - totalExpense;

  const financialScore = Number(
    summary?.financialScore || 0
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {/* Total Income */}
      <Card>
        <h4 className="text-sm text-slate-500">
          Total Income
        </h4>

        <p className="mt-2 text-3xl font-bold text-green-600">
          ₹
          {totalIncome.toLocaleString(
            "en-IN"
          )}
        </p>
      </Card>

      {/* Total Expenses */}
      <Card>
        <h4 className="text-sm text-slate-500">
          Total Expenses
        </h4>

        <p className="mt-2 text-3xl font-bold text-red-600">
          ₹
          {totalExpense.toLocaleString(
            "en-IN"
          )}
        </p>
      </Card>

      {/* Net Savings */}
      <Card>
        <h4 className="text-sm text-slate-500">
          Net Savings
        </h4>

        <p
          className={`mt-2 text-3xl font-bold ${
            netSavings >= 0
              ? "text-blue-600"
              : "text-red-600"
          }`}
        >
          ₹
          {netSavings.toLocaleString(
            "en-IN"
          )}
        </p>
      </Card>

      {/* Financial Score */}
      <Card>
        <h4 className="text-sm text-slate-500">
          Financial Score
        </h4>

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-3xl font-bold text-indigo-600">
            {financialScore}/100
          </p>

          <div
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              financialScore >= 80
                ? "bg-green-100 text-green-700"
                : financialScore >= 60
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {financialScore >= 80
              ? "Excellent"
              : financialScore >= 60
              ? "Good"
              : "Needs Improvement"}
          </div>
        </div>
      </Card>

    </div>
  );
}

export default SummaryCard;