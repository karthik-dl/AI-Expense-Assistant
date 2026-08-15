import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import Card from "../ui/Card";
import Loader from "../ui/Loader";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function MonthlyTrendChart() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchMonthlyData();
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

  const fetchMonthlyData = async () => {
    try {
      setLoading(true);

      const [incomeRes, expenseRes] =
        await Promise.all([
          api.get("/incomes"),
          api.get("/expenses"),
        ]);

      const incomes = getArray(
        incomeRes,
        "incomes"
      );

      const expenses = getArray(
        expenseRes,
        "expenses"
      );

      const monthlyMap = {};

      MONTHS.forEach((month) => {
        monthlyMap[month] = {
          month,
          income: 0,
          expense: 0,
        };
      });

      incomes.forEach((item) => {
        const date = new Date(
          item.income_date
        );

        if (isNaN(date.getTime())) return;

        const month =
          MONTHS[date.getMonth()];

        monthlyMap[month].income +=
          Number(item.amount || 0);
      });

      expenses.forEach((item) => {
        const date = new Date(
          item.expense_date
        );

        if (isNaN(date.getTime())) return;

        const month =
          MONTHS[date.getMonth()];

        monthlyMap[month].expense +=
          Number(item.amount || 0);
      });

      setChartData(
        Object.values(monthlyMap)
      );
    } catch (error) {
      console.error(
        "Monthly Trend Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Loader text="Loading monthly trends..." />
    );
  }

  return (
    <Card hover={false}>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          Monthly Income vs Expenses
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Track your financial activity throughout the year.
        </p>
      </div>

      <div className="h-64 w-full min-w-0 sm:h-72">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <AreaChart
            data={chartData}
            margin={{
              top: 5,
              right: 5,
              left: -15,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient
                id="incomeGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#059669"
                  stopOpacity={0.22}
                />

                <stop
                  offset="95%"
                  stopColor="#059669"
                  stopOpacity={0}
                />
              </linearGradient>

              <linearGradient
                id="expenseGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#DC2626"
                  stopOpacity={0.18}
                />

                <stop
                  offset="95%"
                  stopColor="#DC2626"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#E2E8F0"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="month"
              tick={{
                fill: "#64748B",
                fontSize: 11,
              }}
              axisLine={{
                stroke: "#CBD5E1",
              }}
              tickLine={false}
            />

            <YAxis
              tick={{
                fill: "#64748B",
                fontSize: 11,
              }}
              axisLine={false}
              tickLine={false}
              width={35}
            />

            <Tooltip
              formatter={(value, name) => [
                `₹${Number(value).toLocaleString(
                  "en-IN"
                )}`,
                name === "income"
                  ? "Income"
                  : "Expenses",
              ]}
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
              }}
            />

            <Legend
              wrapperStyle={{
                fontSize: "12px",
              }}
            />

            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#059669"
              fill="url(#incomeGradient)"
              strokeWidth={2}
              dot={false}
            />

            <Area
              type="monotone"
              dataKey="expense"
              name="Expenses"
              stroke="#DC2626"
              fill="url(#expenseGradient)"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default MonthlyTrendChart;