const formatCurrency = (value) => {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const Card = ({ title, value, color }) => (
  <div className="bg-white rounded-xl shadow-md p-5">
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>

    <p className={`mt-2 text-2xl font-bold ${color}`}>
      {value}
    </p>
  </div>
);

const ReportSummaryCards = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

      <Card
        title="Total Income"
        value={formatCurrency(summary?.total_income)}
        color="text-green-600"
      />

      <Card
        title="Total Expense"
        value={formatCurrency(summary?.total_expense)}
        color="text-red-600"
      />

      <Card
        title="Net Savings"
        value={formatCurrency(summary?.net_savings)}
        color={
          (summary?.net_savings || 0) >= 0
            ? "text-blue-600"
            : "text-red-600"
        }
      />

      <Card
        title="Transactions"
        value={summary?.total_transactions || 0}
        color="text-gray-800"
      />

    </div>
  );
};

export default ReportSummaryCards;