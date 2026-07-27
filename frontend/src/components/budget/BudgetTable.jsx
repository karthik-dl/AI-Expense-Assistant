import React from "react";

const BudgetTable = ({
  budgets = [],
  loading = false,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        Loading budgets...
      </div>
    );
  }

  if (!budgets.length) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
        No budgets found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Category</th>
            <th className="px-4 py-3 text-right">Budget</th>
            <th className="px-4 py-3 text-left">Month</th>
            <th className="px-4 py-3 text-left">Year</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {budgets.map((budget) => (
            <tr
              key={budget.id}
              className="border-t hover:bg-gray-50"
            >
              <td className="px-4 py-3">
                {budget.category}
              </td>

              <td className="px-4 py-3 text-right font-semibold text-green-600">
                ₹{Number(budget.amount).toLocaleString()}
              </td>

              <td className="px-4 py-3">
                {budget.month}
              </td>

              <td className="px-4 py-3">
                {budget.year}
              </td>

              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(budget)}
                    className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(budget)}
                    className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetTable;