import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";

import Loader from "../ui/Loader";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

function ExpenseTable({
  expenses = [],
  loading,
  onDelete,
}) {
  if (loading) {
    return <Loader text="Loading expenses..." />;
  }

  if (expenses.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white py-16 text-center shadow-sm">
        <h3 className="text-xl font-semibold text-slate-700">
          No expenses found
        </h3>

        <p className="mt-2 text-slate-500">
          Start by adding your first expense.
        </p>

        <Link to="/expenses/new">
          <Button className="mt-6">
            <Plus size={18} />
            Add Expense
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Title
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Category
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
              Date
            </th>

            <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
              Amount
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((expense) => (
            <tr
              key={expense.id}
              className="border-t border-slate-100 transition hover:bg-slate-50"
            >
              <td className="px-6 py-4 font-medium text-slate-800">
                {expense.title}
              </td>

              <td className="px-6 py-4">
                <Badge>
                  {expense.category || "Others"}
                </Badge>
              </td>

              <td className="px-6 py-4 text-slate-600">
                {expense.date
                  ? new Date(expense.date).toLocaleDateString("en-IN")
                  : "-"}
              </td>

              <td className="px-6 py-4 text-right font-semibold text-red-600">
                ₹{Number(expense.amount || 0).toLocaleString("en-IN")}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                  <Link to={`/expenses/${expense.id}/edit`}>
                    <Button
                      size="sm"
                      variant="secondary"
                    >
                      <Pencil size={16} />
                    </Button>
                  </Link>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => onDelete?.(expense)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;