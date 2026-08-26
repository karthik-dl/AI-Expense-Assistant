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

function IncomeExpenseChart({
  summary = {},
}) {
  const totalIncome = Number(
    summary?.totalIncome || 0
  );

  const totalExpense = Number(
    summary?.totalExpense || 0
  );

  const data = [
    {
      name: "Selected Period",
      Income: totalIncome,
      Expenses: totalExpense,
    },
  ];

  const hasData =
    totalIncome > 0 ||
    totalExpense > 0;

  return (
    <div className="min-w-0 rounded-3xl bg-white p-5 shadow-sm sm:p-6">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-800 sm:text-xl">
          Income vs Expenses
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Compare your income and spending
          for the selected period.
        </p>
      </div>

      {/* Empty State */}
      {!hasData ? (
        <div className="flex h-87.5 items-center justify-center text-center text-sm text-slate-500">
          No income or expense data
          available for this period.
        </div>
      ) : (
        <div className="h-87.5 w-full min-w-0">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 10,
              }}
              barCategoryGap="35%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                tick={{
                  fill: "#64748B",
                  fontSize: 12,
                }}
                axisLine={{
                  stroke: "#CBD5E1",
                }}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#64748B",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
                width={50}
              />

              <Tooltip
                formatter={(value, name) => [
                  `₹${Number(
                    value
                  ).toLocaleString(
                    "en-IN"
                  )}`,
                  name,
                ]}
                contentStyle={{
                  background:
                    "#ffffff",
                  border:
                    "1px solid #e2e8f0",
                  borderRadius:
                    "10px",
                }}
              />

              <Legend
                wrapperStyle={{
                  fontSize: "12px",
                }}
              />

              <Bar
                dataKey="Income"
                name="Income"
                fill="#10B981"
                radius={[
                  8,
                  8,
                  0,
                  0,
                ]}
                maxBarSize={80}
              />

              <Bar
                dataKey="Expenses"
                name="Expenses"
                fill="#EF4444"
                radius={[
                  8,
                  8,
                  0,
                  0,
                ]}
                maxBarSize={80}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>
      )}
    </div>
  );
}

export default IncomeExpenseChart;