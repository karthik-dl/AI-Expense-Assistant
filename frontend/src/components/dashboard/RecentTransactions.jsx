import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Link } from "react-router-dom";

import api from "../../services/api";
import Card from "../ui/Card";
import Loader from "../ui/Loader";
import Badge from "../ui/Badge";

function RecentTransactions() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const getArray = (response, key) => {
    if (Array.isArray(response?.data)) {
      return response.data;
    }

    if (Array.isArray(response?.data?.[key])) {
      return response.data[key];
    }

    if (Array.isArray(response?.data?.data?.[key])) {
      return response.data.data[key];
    }

    return [];
  };

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const [incomeRes, expenseRes] = await Promise.all([
        api.get("/incomes"),
        api.get("/expenses"),
      ]);

      console.log("Income Response:", incomeRes.data);
      console.log("Expense Response:", expenseRes.data);

      const incomes = getArray(incomeRes, "incomes").map((item) => ({
        ...item,
        type: "Income",
        date: item.income_date,
      }));

      const expenses = getArray(expenseRes, "expenses").map((item) => ({
        ...item,
        type: "Expense",
        date: item.expense_date,
      }));

      const merged = [...incomes, ...expenses]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 7);

      setTransactions(merged);
    } catch (error) {
      console.error("Recent Transactions Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading transactions..." />;
  }

  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Recent Transactions
        </h2>

        <Link
          to="/expenses"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          View All
        </Link>
      </div>

      {transactions.length === 0 ? (
        <div className="py-16 text-center text-slate-500">
          No transactions found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-slate-500">
                <th className="pb-3">Type</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Date</th>
                <th className="pb-3 text-right">Amount</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((item) => (
                <tr
                  key={`${item.type}-${item.id}`}
                  className="border-b last:border-none"
                >
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      {item.type === "Income" ? (
                        <ArrowDownLeft
                          className="text-green-600"
                          size={18}
                        />
                      ) : (
                        <ArrowUpRight
                          className="text-red-600"
                          size={18}
                        />
                      )}

                      {item.type}
                    </div>
                  </td>

                  <td>
                    <Badge>
                      {item.category || "General"}
                    </Badge>
                  </td>

                  <td>
                    {new Date(item.date).toLocaleDateString("en-IN")}
                  </td>

                  <td
                    className={`text-right font-semibold ${
                      item.type === "Income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {item.type === "Income" ? "+" : "-"}₹
                    {Number(item.amount).toLocaleString("en-IN")}
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