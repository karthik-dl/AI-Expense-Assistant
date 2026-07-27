import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function MonthlySummaryChart({ data }) {
  const chartData = [
    {
      name: "This Month",
      Income: data.income,
      Expense: data.expense,
      Savings: data.savings,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6 h-100">
      <h2 className="text-xl font-semibold mb-6">
        Monthly Summary
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="Income" fill="#16A34A" />

          <Bar dataKey="Expense" fill="#DC2626" />

          <Bar dataKey="Savings" fill="#2563EB" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlySummaryChart;