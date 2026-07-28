import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#EC4899",
];

function ExpenseAnalytics({ expenses }) {
  // Monthly totals
  const monthlyData = Array.from({ length: 12 }, (_, index) => {
    const total = expenses
      .filter(
        (expense) =>
          new Date(expense.date).getMonth() === index
      )
      .reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
      );

    return {
      month: new Date(0, index).toLocaleString("default", {
        month: "short",
      }),
      total,
    };
  });

  // Category totals
  const categoryMap = {};

  expenses.forEach((expense) => {
    const category = expense.category || "Others";

    categoryMap[category] =
      (categoryMap[category] || 0) +
      Number(expense.amount);
  });

  const categoryData = Object.entries(categoryMap).map(
    ([name, value]) => ({
      name,
      value,
    })
  );

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {/* Monthly Bar Chart */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold">
          Monthly Expenses
        </h3>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="total"
              fill="#2563EB"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Pie Chart */}
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold">
          Category Distribution
        </h3>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              outerRadius={110}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Spending Trend */}
      <div className="rounded-3xl bg-white p-6 shadow-sm xl:col-span-2">
        <h3 className="mb-6 text-lg font-semibold">
          Spending Trend
        </h3>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#10B981"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExpenseAnalytics;