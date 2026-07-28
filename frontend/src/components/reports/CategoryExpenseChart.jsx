import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#EC4899",
  "#84CC16",
];

function CategoryExpenseChart({ summary }) {
  const categoryData = summary.categoryExpenses || [];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Expense by Category
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Distribution of expenses across categories.
        </p>
      </div>

      {categoryData.length === 0 ? (
        <div className="flex h-87.5 items-center justify-center text-slate-500">
          No expense data available.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="amount"
              nameKey="category"
              outerRadius={120}
              label={({ category, percent }) =>
                `${category} ${(percent * 100).toFixed(0)}%`
              }
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={entry.category}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "Expense",
              ]}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default CategoryExpenseChart;