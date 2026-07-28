import Card from "../ui/Card";

function ReportsSummary({ summary }) {
  const totalIncome = Number(summary.totalIncome || 0);
  const totalExpense = Number(summary.totalExpense || 0);

  const netSavings = totalIncome - totalExpense;

  const savingsRate =
    totalIncome > 0
      ? (netSavings / totalIncome) * 100
      : 0;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <Card>
        <h4 className="text-sm text-slate-500">
          Total Income
        </h4>

        <p className="mt-2 text-3xl font-bold text-green-600">
          ₹{totalIncome.toLocaleString("en-IN")}
        </p>
      </Card>

      <Card>
        <h4 className="text-sm text-slate-500">
          Total Expenses
        </h4>

        <p className="mt-2 text-3xl font-bold text-red-600">
          ₹{totalExpense.toLocaleString("en-IN")}
        </p>
      </Card>

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
          ₹{netSavings.toLocaleString("en-IN")}
        </p>
      </Card>

      <Card>
        <h4 className="text-sm text-slate-500">
          Savings Rate
        </h4>

        <p
          className={`mt-2 text-3xl font-bold ${
            savingsRate >= 20
              ? "text-green-600"
              : savingsRate >= 10
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          {savingsRate.toFixed(1)}%
        </p>
      </Card>
    </div>
  );
}

export default ReportsSummary;