import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function MonthlyTrendChart({ summary }) {
  const monthlyData = summary.monthlyTrend || [];

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Monthly Financial Trend
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Compare your monthly income and expenses throughout the year.
        </p>
      </div>

      {monthlyData.length === 0 ? (
        <div className="flex h-100 items-center justify-center text-slate-500">
          No monthly trend data available.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip
              formatter={(value) =>
                `₹${Number(value).toLocaleString("en-IN")}`
              }
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="expense"
              name="Expense"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default MonthlyTrendChart;