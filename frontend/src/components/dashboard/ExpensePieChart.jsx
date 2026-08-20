import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

import Card from "../ui/Card";
import Loader from "../ui/Loader";

const COLORS = [
  "#2563EB",
  "#059669",
  "#DC2626",
  "#7C3AED",
  "#EA580C",
  "#0891B2",
  "#CA8A04",
  "#4F46E5",
];

function ExpensePieChart() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchExpenses();
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

  const fetchExpenses = async () => {
    try {
      setLoading(true);

      const response =
        await api.get("/expenses");

      const expenses = getArray(
        response,
        "expenses"
      );

      const today = new Date();

      const currentMonth =
        today.getMonth();

      const currentYear =
        today.getFullYear();

      // Only current month expenses
      const currentMonthExpenses =
        expenses.filter((item) => {
          const date = new Date(
            item.expense_date ||
              item.date
          );

          if (isNaN(date.getTime())) {
            return false;
          }

          return (
            date.getMonth() ===
              currentMonth &&
            date.getFullYear() ===
              currentYear
          );
        });

      // Group by category
      const grouped =
        currentMonthExpenses.reduce(
          (acc, item) => {
            const category =
              item.category ||
              "Others";

            acc[category] =
              (acc[category] || 0) +
              Number(item.amount || 0);

            return acc;
          },
          {}
        );

      const chartData = Object.entries(
        grouped
      )
        .map(([name, value]) => ({
          name,
          value,
        }))
        .sort(
          (a, b) =>
            b.value - a.value
        );

      setData(chartData);
    } catch (error) {
      console.error(
        "Expense Pie Chart Error:",
        error
      );

      setData([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Loader text="Loading expense analytics..." />
    );
  }

  const totalExpense = data.reduce(
    (sum, item) =>
      sum + Number(item.value || 0),
    0
  );

  return (
    <Card hover={false}>
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          Expense by Category
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your spending distribution for
          this month.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-center text-sm text-slate-500">
          No expense data available for
          this month.
        </div>
      ) : (
        <>
          {/* Total */}
          <div className="mb-3 rounded-xl bg-slate-50 p-3">
            <p className="text-xs font-medium text-slate-500">
              Total Expenses
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              ₹
              {totalExpense.toLocaleString(
                "en-IN"
              )}
            </p>
          </div>

          {/* Chart */}
          <div className="h-64 w-full sm:h-72">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="42%"
                  outerRadius="62%"
                  innerRadius="38%"
                  paddingAngle={3}
                >
                  {data.map(
                    (entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip
                  formatter={(value) =>
                    `₹${Number(
                      value
                    ).toLocaleString(
                      "en-IN"
                    )}`
                  }
                  contentStyle={{
                    background:
                      "#ffffff",
                    border:
                      "1px solid #e2e8f0",
                    borderRadius:
                      "10px",
                  }}
                />

                <Legend
                  wrapperStyle={{
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </Card>
  );
}

export default ExpensePieChart;