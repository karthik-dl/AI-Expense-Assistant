function ExpenseTable({
  expenses,
  pagination,
  onEdit,
  onDelete,
  onPageChange,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="px-6 py-4 text-left">
                Description
              </th>

              <th className="px-6 py-4 text-left">
                Category
              </th>

              <th className="px-6 py-4 text-left">
                Amount
              </th>

              <th className="px-6 py-4 text-left">
                Date
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>
            </tr>

          </thead>

          <tbody>

            {expenses.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-gray-500"
                >
                  No expenses found.
                </td>
              </tr>
            ) : (
              expenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    {expense.description}
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {expense.category}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-semibold text-red-600">
                    ₹{Number(expense.amount).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      expense.expense_date
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => onEdit(expense)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(expense.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>

                    </div>

                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

      {pagination && (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t px-6 py-4">

          <div className="text-gray-600">
            Showing Page <strong>{pagination.page}</strong> of{" "}
            <strong>{pagination.total_pages}</strong>
          </div>

          <div className="text-gray-600">
            Total Records:{" "}
            <strong>{pagination.total_records}</strong>
          </div>

          <div className="flex gap-3">

            <button
              disabled={pagination.page === 1}
              onClick={() =>
                onPageChange(pagination.page - 1)
              }
              className={`px-4 py-2 rounded ${
                pagination.page === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-gray-700 text-white hover:bg-gray-800"
              }`}
            >
              ← Previous
            </button>

            <button
              disabled={
                pagination.page ===
                pagination.total_pages
              }
              onClick={() =>
                onPageChange(pagination.page + 1)
              }
              className={`px-4 py-2 rounded ${
                pagination.page ===
                pagination.total_pages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next →
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default ExpenseTable;