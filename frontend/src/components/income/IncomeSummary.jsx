import Card from "../ui/Card";

function IncomeSummary({ incomes }) {
  const totalIncome = incomes.reduce(
    (sum, income) => sum + Number(income.amount || 0),
    0
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonthIncome = incomes
    .filter((income) => {
      const date = new Date(income.date);

      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce(
      (sum, income) => sum + Number(income.amount || 0),
      0
    );

  const averageIncome =
    incomes.length > 0
      ? totalIncome / incomes.length
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
          This Month
        </h4>

        <p className="mt-2 text-3xl font-bold text-blue-600">
          ₹{thisMonthIncome.toLocaleString("en-IN")}
        </p>
      </Card>

      <Card>
        <h4 className="text-sm text-slate-500">
          Average Income
        </h4>

        <p className="mt-2 text-3xl font-bold text-emerald-600">
          ₹{averageIncome.toFixed(2)}
        </p>
      </Card>

      <Card>
        <h4 className="text-sm text-slate-500">
          Transactions
        </h4>

        <p className="mt-2 text-3xl font-bold text-slate-800">
          {incomes.length}
        </p>
      </Card>
    </div>
  );
}

export default IncomeSummary;