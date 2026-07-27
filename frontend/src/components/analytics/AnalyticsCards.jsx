
const formatCurrency = (value) => {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const Card = ({ title, value, color, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-gray-500 font-medium">
          {title}
        </h3>

        <span className="text-2xl">
          {icon}
        </span>
      </div>

      <p className={`text-3xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
};

const AnalyticsCards = ({ analytics = {} }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

      <Card
        title="Total Income"
        value={formatCurrency(analytics.total_income)}
        color="text-green-600"
        icon="💰"
      />

      <Card
        title="Total Expense"
        value={formatCurrency(analytics.total_expense)}
        color="text-red-600"
        icon="💸"
      />

      <Card
        title="Net Savings"
        value={formatCurrency(analytics.net_savings)}
        color={
          analytics.net_savings >= 0
            ? "text-blue-600"
            : "text-red-600"
        }
        icon="📈"
      />

      <Card
        title="Savings Rate"
        value={`${analytics.savings_rate || 0}%`}
        color="text-purple-600"
        icon="📊"
      />

      <Card
        title="Transactions"
        value={analytics.total_transactions || 0}
        color="text-gray-700"
        icon="🧾"
      />

    </div>
  );
};

export default AnalyticsCards;