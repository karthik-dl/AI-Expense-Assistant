import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

import api from "../../services/api";
import Card from "../ui/Card";
import Loader from "../ui/Loader";
import Badge from "../ui/Badge";

function RecentTransactions() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] =
    useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const getArray = (response, key) => {
    if (Array.isArray(response?.data)) {
      return response.data;
    }

    if (
      Array.isArray(response?.data?.[key])
    ) {
      return response.data[key];
    }

    if (
      Array.isArray(
        response?.data?.data?.[key]
      )
    ) {
      return response.data.data[key];
    }

    return [];
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const [
        incomeRes,
        expenseRes,
      ] = await Promise.all([
        api.get("/incomes"),
        api.get("/expenses"),
      ]);

      const incomes = getArray(
        incomeRes,
        "incomes"
      ).map((item) => ({
        ...item,
        type: "Income",
        date:
          item.income_date ||
          item.date,
        description:
          item.source ||
          item.title ||
          "Income",
      }));

      const expenses = getArray(
        expenseRes,
        "expenses"
      ).map((item) => ({
        ...item,
        type: "Expense",
        date:
          item.expense_date ||
          item.date,
        description:
          item.description ||
          item.title ||
          "Expense",
      }));

      const merged = [
        ...incomes,
        ...expenses,
      ]
        .filter((item) => {
          if (!item.date) {
            return false;
          }

          return !isNaN(
            new Date(item.date).getTime()
          );
        })
        .sort(
          (a, b) =>
            new Date(b.date) -
            new Date(a.date)
        )
        .slice(0, 7);

      setTransactions(merged);
    } catch (error) {
      console.error(
        "Recent Transactions Error:",
        error
      );

      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Loader text="Loading transactions..." />
    );
  }

  return (
    <Card hover={false}>
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your latest income and expenses.
          </p>
        </div>

        <Link
          to="/expenses"
          className="shrink-0 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
        >
          View All
        </Link>
      </div>

      {/* Empty State */}
      {transactions.length === 0 ? (
        <div className="flex min-h-40 items-center justify-center text-center text-sm text-slate-500">
          No transactions found.
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-162.5">
            <thead>
              <tr className="border-b border-slate-200 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="pb-3">
                  Type
                </th>

                <th className="pb-3">
                  Description
                </th>

                <th className="pb-3">
                  Category
                </th>

                <th className="pb-3">
                  Date
                </th>

                <th className="pb-3 text-right">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((item) => (
                <tr
                  key={`${item.type}-${item.id}`}
                  className="border-b border-slate-100 last:border-none"
                >
                  {/* Type */}
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                          item.type === "Income"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {item.type ===
                        "Income" ? (
                          <ArrowDownLeft
                            size={16}
                          />
                        ) : (
                          <ArrowUpRight
                            size={16}
                          />
                        )}
                      </span>

                      <span className="text-sm font-medium text-slate-700">
                        {item.type}
                      </span>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="max-w-45 py-3">
                    <p className="truncate text-sm font-medium text-slate-700">
                      {item.description}
                    </p>
                  </td>

                  {/* Category */}
                  <td className="py-3">
                    <Badge
                      variant={
                        item.type ===
                        "Income"
                          ? "success"
                          : "danger"
                      }
                      size="sm"
                    >
                      {item.category ||
                        "General"}
                    </Badge>
                  </td>

                  {/* Date */}
                  <td className="whitespace-nowrap py-3 text-sm text-slate-500">
                    {new Date(
                      item.date
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>

                  {/* Amount */}
                  <td
                    className={`whitespace-nowrap py-3 text-right text-sm font-semibold ${
                      item.type ===
                      "Income"
                        ? "text-emerald-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.type ===
                    "Income"
                      ? "+"
                      : "-"}
                    ₹
                    {Number(
                      item.amount || 0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

export default RecentTransactions;