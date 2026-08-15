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
  Legend,
} from "recharts";

const COLORS = [
  "#10B981",
  "#2563EB",
  "#6366F1",
  "#F59E0B",
  "#06B6D4",
  "#8B5CF6",
  "#64748B",
];

function IncomeAnalytics({
  incomes = [],
}) {
  const getIncomeDate = (income) =>
    income?.income_date ||
    income?.date ||
    "";

  const monthlyData = Array.from(
    { length: 12 },
    (_, index) => {
      const total = incomes
        .filter((income) => {
          const date = new Date(
            getIncomeDate(income)
          );

          return (
            !Number.isNaN(
              date.getTime()
            ) &&
            date.getMonth() === index
          );
        })
        .reduce(
          (sum, income) =>
            sum +
            Number(income.amount || 0),
          0
        );

      return {
        month: new Date(
          2000,
          index,
          1
        ).toLocaleString("en-IN", {
          month: "short",
        }),
        total,
      };
    }
  );

  const categoryMap = {};

  incomes.forEach((income) => {
    const category =
      income.category || "Others";

    categoryMap[category] =
      (categoryMap[category] || 0) +
      Number(income.amount || 0);
  });

  const categoryData = Object.entries(
    categoryMap
  ).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="grid min-w-0 gap-5 xl:grid-cols-2">
      {/* Monthly Income */}
      <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-slate-900">
            Monthly Income
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Income received throughout the year.
          </p>
        </div>

        <div className="h-70 min-w-0 sm:h-75">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={monthlyData}
              margin={{
                top: 5,
                right: 5,
                left: -15,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E2E8F0"
              />

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 12,
                  fill: "#64748B",
                }}
              />

              <YAxis
                tick={{
                  fontSize: 12,
                  fill: "#64748B",
                }}
              />

              <Tooltip
                formatter={(value) => [
                  `₹${Number(
                    value || 0
                  ).toLocaleString("en-IN")}`,
                  "Income",
                ]}
              />

              <Bar
                dataKey="total"
                fill="#10B981"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Income Sources */}
      <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-slate-900">
            Income Sources
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Breakdown by income category.
          </p>
        </div>

        {categoryData.length === 0 ? (
          <div className="flex h-70 items-center justify-center text-sm text-slate-500 sm:h-75">
            No income data available.
          </div>
        ) : (
          <div className="h-70 min-w-0 sm:h-75">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                >
                  {categoryData.map(
                    (entry, index) => (
                      <Cell
                        key={entry.name}
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
                  formatter={(value) => [
                    `₹${Number(
                      value || 0
                    ).toLocaleString(
                      "en-IN"
                    )}`,
                    "Income",
                  ]}
                />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Income Trend */}
      <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-slate-900">
            Income Trend
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Monthly income movement.
          </p>
        </div>

        <div className="h-70 min-w-0 sm:h-75">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={monthlyData}
              margin={{
                top: 5,
                right: 5,
                left: -15,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E2E8F0"
              />

              <XAxis
                dataKey="month"
                tick={{
                  fontSize: 12,
                  fill: "#64748B",
                }}
              />

              <YAxis
                tick={{
                  fontSize: 12,
                  fill: "#64748B",
                }}
              />

              <Tooltip
                formatter={(value) => [
                  `₹${Number(
                    value || 0
                  ).toLocaleString("en-IN")}`,
                  "Income",
                ]}
              />

              <Line
                type="monotone"
                dataKey="total"
                stroke="#2563EB"
                strokeWidth={3}
                dot={{
                  r: 3,
                  fill: "#2563EB",
                }}
                activeDot={{
                  r: 5,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default IncomeAnalytics;