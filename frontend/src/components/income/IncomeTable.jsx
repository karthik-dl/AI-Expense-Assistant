import { Link } from "react-router-dom";
import { Pencil, Trash2, Plus } from "lucide-react";

import Loader from "../ui/Loader";
import Badge from "../ui/Badge";
import Button from "../ui/Button";

function IncomeTable({
  incomes = [],
  loading,
  onDelete,
}) {
  if (loading) {
    return <Loader text="Loading income..." />;
  }

  if (incomes.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white py-16 text-center shadow-sm">
        <h3 className="text-xl font-semibold text-slate-700">
          No income found
        </h3>

        <p className="mt-2 text-slate-500">
          Start by adding your first income.
        </p>

        <Link to="/income/new">
          <Button className="mt-6">
            <Plus size={18} />
            Add Income
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
              Source
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
          {incomes.map((income) => (
            <tr
              key={income.id}
              className="border-t border-slate-100 transition hover:bg-slate-50"
            >
              <td className="px-6 py-4 font-medium text-slate-800">
                {income.title}
              </td>

              <td className="px-6 py-4">
                <Badge>
                  {income.category || income.source || "Others"}
                </Badge>
              </td>

              <td className="px-6 py-4 text-slate-600">
                {income.date
                  ? new Date(income.date).toLocaleDateString("en-IN")
                  : "-"}
              </td>

              <td className="px-6 py-4 text-right font-semibold text-green-600">
                ₹{Number(income.amount || 0).toLocaleString("en-IN")}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                 <Link to={`/income/${income.id}/edit`}>
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
                    onClick={() => onDelete?.(income)}
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

export default IncomeTable;