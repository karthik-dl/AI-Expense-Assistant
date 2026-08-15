import { Link } from "react-router-dom";
import {
  Pencil,
  Trash2,
  Plus,
  Receipt,
} from "lucide-react";

import Loader from "../ui/Loader";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

function ExpenseTable({
  expenses = [],
  loading = false,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="w-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <Loader text="Loading expenses..." />
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-14 text-center shadow-sm sm:px-6 sm:py-16">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <Receipt size={26} />
        </div>

        <h3 className="mt-5 text-lg font-semibold text-slate-900">
          No expenses found
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
          Start tracking your spending by
          adding your first expense.
        </p>

        <Link to="/expenses/new">
          <Button
            className="mt-6"
            leftIcon={<Plus size={18} />}
          >
            Add Expense
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Mobile scroll container */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-180">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Title
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Category
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Date
              </th>

              <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Amount
              </th>

              <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <tr
                key={expense.id}
                className="border-t border-slate-100 transition-colors hover:bg-slate-50"
              >
                {/* Title */}
                <td className="px-5 py-4 sm:px-6">
                  <p className="max-w-55 truncate text-sm font-semibold text-slate-800">
                    {expense.title ||
                      "Untitled Expense"}
                  </p>
                </td>

                {/* Category */}
                <td className="px-5 py-4 sm:px-6">
                  <Badge
                    variant="primary"
                    size="sm"
                  >
                    {expense.category ||
                      "Others"}
                  </Badge>
                </td>

                {/* Date */}
                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500 sm:px-6">
                  {expense.date
                    ? new Date(
                        expense.date
                      ).toLocaleDateString(
                        "en-IN"
                      )
                    : "-"}
                </td>

                {/* Amount */}
                <td className="whitespace-nowrap px-5 py-4 text-right text-sm font-bold text-red-600 sm:px-6">
                  -₹
                  {Number(
                    expense.amount || 0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </td>

                {/* Actions */}
                <td className="px-5 py-4 sm:px-6">
                  <div className="flex items-center justify-center gap-2">
                    <Link
                      to={`/expenses/${expense.id}/edit`}
                      aria-label={`Edit ${
                        expense.title ||
                        "expense"
                      }`}
                    >
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        className="h-9 w-9 px-0"
                        aria-label="Edit expense"
                      >
                        <Pencil size={15} />
                      </Button>
                    </Link>

                    <Button
                      type="button"
                      size="sm"
                      variant="danger"
                      className="h-9 w-9 px-0"
                      onClick={() =>
                        onDelete?.(expense)
                      }
                      aria-label={`Delete ${
                        expense.title ||
                        "expense"
                      }`}
                    >
                      <Trash2 size={15} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ExpenseTable;