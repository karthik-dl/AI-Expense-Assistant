import Card from "../ui/Card";

function ExpenseSummary({ expenses }) {
  const totalExpense = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const thisMonthExpense = expenses
    .filter((expense) => {
      const date = new Date(expense.date);

      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

  const averageExpense =
    expenses.length > 0
      ? totalExpense / expenses.length
      : 0;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
          This Month
        </h4>

        <p className="mt-2 text-3xl font-bold text-blue-600">
          ₹{thisMonthExpense.toLocaleString("en-IN")}
        </p>
      </Card>

      <Card>
        <h4 className="text-sm text-slate-500">
          Average Expense
        </h4>

        <p className="mt-2 text-3xl font-bold text-green-600">
          ₹{averageExpense.toFixed(2)}
        </p>
      </Card>

      <Card>
        <h4 className="text-sm text-slate-500">
          Transactions
        </h4>

        <p className="mt-2 text-3xl font-bold text-slate-800">
          {expenses.length}
        </p>
      </Card>
    </div>
  );
}

export default ExpenseSummary;