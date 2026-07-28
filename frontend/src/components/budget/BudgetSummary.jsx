import Card from "../ui/Card";

function BudgetSummary({ budgets }) {
  const totalBudget = budgets.reduce(
    (sum, budget) => sum + Number(budget.amount || 0),
    0
  );

  const totalSpent = budgets.reduce(
    (sum, budget) => sum + Number(budget.spent || 0),
    0
  );

  const remaining = totalBudget - totalSpent;

  const totalCategories = budgets.length;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <Card>
        <h4 className="text-sm text-slate-500">
          Total Budget
        </h4>

        <p className="mt-2 text-3xl font-bold text-blue-600">
          ₹{totalBudget.toLocaleString("en-IN")}
        </p>
      </Card>

      <Card>
        <h4 className="text-sm text-slate-500">
          Total Spent
        </h4>

        <p className="mt-2 text-3xl font-bold text-red-500">
          ₹{totalSpent.toLocaleString("en-IN")}
        </p>
      </Card>

      <Card>
        <h4 className="text-sm text-slate-500">
          Remaining Budget
        </h4>

        <p
          className={`mt-2 text-3xl font-bold ${
            remaining >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          ₹{remaining.toLocaleString("en-IN")}
        </p>
      </Card>

      <Card>
        <h4 className="text-sm text-slate-500">
          Categories
        </h4>

        <p className="mt-2 text-3xl font-bold text-slate-800">
          {totalCategories}
        </p>
      </Card>
    </div>
  );
}

export default BudgetSummary;