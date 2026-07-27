function RecentTransactionTable({ transactions }) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-6">
        Recent Transactions
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="py-3">Type</th>
              <th className="py-3">Title</th>
              <th className="py-3">Category</th>
              <th className="py-3">Amount</th>
              <th className="py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500"
                >
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((item, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        item.type === "Income"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>

                  <td>{item.title}</td>

                  <td>{item.category}</td>

                  <td
                    className={`font-semibold ${
                      item.type === "Income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ₹{item.amount.toLocaleString()}
                  </td>

                  <td>
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTransactionTable;