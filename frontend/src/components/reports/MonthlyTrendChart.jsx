import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function MonthlyTrendChart({
  summary = {},
}) {
  const data = Array.isArray(
    summary?.monthlyTrend
  )
    ? summary.monthlyTrend
    : [];

  const hasData = data.some(
    (item) =>
      Number(item?.income || 0) > 0 ||
      Number(item?.expense || 0) > 0
  );

  return (
    <div className="min-w-0 rounded-3xl bg-white p-5 shadow-sm sm:p-6">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-800 sm:text-xl">
          Monthly Financial Trend
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Track income and expenses month by
          month.
        </p>
      </div>

      {/* Empty State */}
      {!hasData ? (
        <div className="flex h-87.5 items-center justify-center text-center text-sm text-slate-500">
          No monthly financial data
          available.
        </div>
      ) : (
        <div className="h-87.5 w-full min-w-0">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 10,
              }}
            >
              <defs>
                <linearGradient
                  id="reportIncomeGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#059669"
                    stopOpacity={0.25}
                  />

                  <stop
                    offset="95%"
                    stopColor="#059669"
                    stopOpacity={0}
                  />
                </linearGradient>

                <linearGradient
                  id="reportExpenseGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#DC2626"
                    stopOpacity={0.20}
                  />

                  <stop
                    offset="95%"
                    stopColor="#DC2626"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#E2E8F0"
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
                tick={{
                  fill: "#64748B",
                  fontSize: 11,
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
                formatter={(
                  value,
                  name
                ) => [
                  `₹${Number(
                    value
                  ).toLocaleString(
                    "en-IN"
                  )}`,
                  name,
                ]}
                contentStyle={{
                  background: "#ffffff",
                  border:
                    "1px solid #e2e8f0",
                  borderRadius: "10px",
                }}
              />

              <Legend
                wrapperStyle={{
                  fontSize: "12px",
                }}
              />

              <Area
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#059669"
                fill="url(#reportIncomeGradient)"
                strokeWidth={2}
                dot={false}
              />

              <Area
                type="monotone"
                dataKey="expense"
                name="Expenses"
                stroke="#DC2626"
                fill="url(#reportExpenseGradient)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default MonthlyTrendChart;