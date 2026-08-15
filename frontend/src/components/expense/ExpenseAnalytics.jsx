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

function ExpenseAnalytics({ expenses = [] }) {
  // Monthly totals
  const monthlyData = Array.from(
    { length: 12 },
    (_, index) => {
      const total = expenses
        .filter((expense) => {
          const date = new Date(
            expense.date
          );

          return date.getMonth() === index;
        })
        .reduce(
          (sum, expense) =>
            sum +
            Number(expense.amount || 0),
          0
        );

      return {
        month: new Date(
          2000,
          index
        ).toLocaleString("default", {
          month: "short",
        }),
        total,
      };
    }
  );

  // Category totals
  const categoryMap = {};

  expenses.forEach((expense) => {
    const category =
      expense.category || "Others";

    categoryMap[category] =
      (categoryMap[category] || 0) +
      Number(expense.amount || 0);
  });

  const categoryData = Object.entries(
    categoryMap
  ).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <section className="grid min-w-0 gap-4 xl:grid-cols-2">
      {/* Monthly Expenses */}
      <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h3 className="text-base font-semibold text-slate-900">
            Monthly Expenses
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Your spending by month.
          </p>
        </div>

        <div className="h-70 w-full min-w-0 sm:h-75">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={monthlyData}
              margin={{
                top: 5,
                right: 5,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E2E8F0"
              />

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 12,
                  fill: "#64748B",
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 12,
                  fill: "#64748B",
                }}
                axisLine={false}
                tickLine={false}
                width={45}
              />

              <Tooltip
                formatter={(value) => [
                  `₹${Number(
                    value
                  ).toLocaleString(
                    "en-IN"
                  )}`,
                  "Expenses",
                ]}
              />

              <Bar
                dataKey="total"
                fill="#2563EB"
                radius={[
                  6,
                  6,
                  0,
                  0,
                ]}
                maxBarSize={36}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h3 className="text-base font-semibold text-slate-900">
            Category Distribution
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            See where your money is going.
          </p>
        </div>

        {categoryData.length === 0 ? (
          <div className="flex h-70 items-center justify-center sm:h-75">
            <p className="text-sm text-slate-500">
              No category data available.
            </p>
          </div>
        ) : (
          <div className="h-70 w-full min-w-0 sm:h-75">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius="70%"
                  innerRadius="42%"
                  paddingAngle={2}
                >
                  {categoryData.map(
                    (entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip
                  formatter={(value, name) => [
                    `₹${Number(
                      value
                    ).toLocaleString(
                      "en-IN"
                    )}`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Spending Trend */}
      <div className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2 sm:p-6">
        <div className="mb-5">
          <h3 className="text-base font-semibold text-slate-900">
            Spending Trend
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Track how your expenses change
            throughout the year.
          </p>
        </div>

        <div className="h-70 w-full min-w-0 sm:h-75">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={monthlyData}
              margin={{
                top: 5,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E2E8F0"
              />

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 12,
                  fill: "#64748B",
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fontSize: 12,
                  fill: "#64748B",
                }}
                axisLine={false}
                tickLine={false}
                width={45}
              />

              <Tooltip
                formatter={(value) => [
                  `₹${Number(
                    value
                  ).toLocaleString(
                    "en-IN"
                  )}`,
                  "Expenses",
                ]}
              />

              <Line
                type="monotone"
                dataKey="total"
                stroke="#10B981"
                strokeWidth={3}
                dot={{
                  r: 3,
                  fill: "#10B981",
                }}
                activeDot={{
                  r: 5,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

export default ExpenseAnalytics;