import { Link } from "react-router-dom";
import {
  Pencil,
  Trash2,
  Plus,
  Wallet,
} from "lucide-react";

import Loader from "../ui/Loader";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

function IncomeTable({
  incomes = [],
  loading,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 shadow-sm">
        <Loader text="Loading income..." />
      </div>
    );
  }

  if (incomes.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
          <Wallet size={26} />
        </div>

        <h3 className="mt-5 text-lg font-semibold text-slate-900">
          No income found
        </h3>

        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
          Start tracking your earnings by
          adding your first income.
        </p>

        <Link to="/income/new">
          <Button
            className="mt-6"
            leftIcon={<Plus size={18} />}
          >
            Add Income
          </Button>
        </Link>
      </div>
    );
  }

  const getIncomeDate = (income) =>
    income?.income_date ||
    income?.date ||
    "";

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-175">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Title
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                Source
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
            {incomes.map((income) => (
              <tr
                key={income.id}
                className="border-t border-slate-100 transition hover:bg-slate-50"
              >
                <td className="px-5 py-4 sm:px-6">
                  <p className="max-w-55 truncate text-sm font-semibold text-slate-800">
                    {income.title ||
                      "Untitled Income"}
                  </p>
                </td>

                <td className="px-5 py-4 sm:px-6">
                  <Badge
                    variant="success"
                    size="sm"
                  >
                    {income.category ||
                      income.source ||
                      "Others"}
                  </Badge>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500 sm:px-6">
                  {getIncomeDate(income)
                    ? new Date(
                        getIncomeDate(
                          income
                        )
                      ).toLocaleDateString(
                        "en-IN"
                      )
                    : "-"}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-right text-sm font-bold text-emerald-600 sm:px-6">
                  +₹
                  {Number(
                    income.amount || 0
                  ).toLocaleString(
                    "en-IN"
                  )}
                </td>

                <td className="px-5 py-4 sm:px-6">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/income/${income.id}/edit`}
                    >
                      <Button
                        type="button"
                        size="sm"
                        variant="secondary"
                        className="h-9 w-9 px-0"
                        aria-label="Edit income"
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
                        onDelete?.(income)
                      }
                      aria-label="Delete income"
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
    </div>
  );
}

export default IncomeTable;