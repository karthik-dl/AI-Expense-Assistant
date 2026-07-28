import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function IncomeExpenseChart({ summary }) {
  const data = [
    {
      name: "Finance",
      Income: Number(summary.totalIncome || 0),
      Expense: Number(summary.totalExpense || 0),
    },
  ];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Income vs Expenses
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Compare your total income and expenses.
        </p>
      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip
            formatter={(value) =>
              `₹${Number(value).toLocaleString("en-IN")}`
            }
          />

          <Legend />

          <Bar
            dataKey="Income"
            fill="#10B981"
            radius={[8, 8, 0, 0]}
          />

          <Bar
            dataKey="Expense"
            fill="#EF4444"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomeExpenseChart;