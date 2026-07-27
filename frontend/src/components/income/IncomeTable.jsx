function IncomeTable({
  incomes,
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
                Source
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

            {incomes.length === 0 ? (
              <tr>

                <td
                  colSpan={5}
                  className="py-12 text-center text-gray-500"
                >
                  No income records found.
                </td>

              </tr>
            ) : (
              incomes.map((income) => (
                <tr
                  key={income.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="px-6 py-4">
                    {income.source}
                  </td>

                  <td className="px-6 py-4">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {income.category}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-semibold text-green-600">
                    ₹{Number(income.amount).toLocaleString()}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(
                      income.income_date
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() => onEdit(income)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(income.id)}
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
                  : "bg-green-600 text-white hover:bg-green-700"
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

export default IncomeTable;