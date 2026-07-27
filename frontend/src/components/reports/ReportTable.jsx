const formatCurrency = (amount) => {
  return `₹${Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const ReportTable = ({
  transactions = [],
  loading = false,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center">
        Loading reports...
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-5 py-3 text-left">Date</th>
            <th className="px-5 py-3 text-left">Type</th>
            <th className="px-5 py-3 text-left">Category</th>
            <th className="px-5 py-3 text-left">Description</th>
            <th className="px-5 py-3 text-right">Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-5 py-4">
                {formatDate(transaction.date)}
              </td>

              <td className="px-5 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    transaction.type === "Income"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {transaction.type}
                </span>
              </td>

              <td className="px-5 py-4">
                {transaction.category}
              </td>

              <td className="px-5 py-4">
                {transaction.description || "-"}
              </td>

              <td
                className={`px-5 py-4 text-right font-semibold ${
                  transaction.type === "Income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {formatCurrency(transaction.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;