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

      const [incomeRes, expenseRes] = await Promise.all([
        api.get("/incomes"),
        api.get("/expenses"),
      ]);

      console.log("Income:", incomeRes.data);
      console.log("Expense:", expenseRes.data);

      const incomes = getArray(incomeRes, "incomes");
      const expenses = getArray(expenseRes, "expenses");

      const monthlyMap = {};

      MONTHS.forEach((month) => {
        monthlyMap[month] = {
          month,
          income: 0,
          expense: 0,
        };
      });

      incomes.forEach((item) => {
        const date = new Date(item.income_date);

        if (isNaN(date.getTime())) return;

        const month = MONTHS[date.getMonth()];

        monthlyMap[month].income += Number(item.amount || 0);
      });

      expenses.forEach((item) => {
        const date = new Date(item.expense_date);

        if (isNaN(date.getTime())) return;

        const month = MONTHS[date.getMonth()];

        monthlyMap[month].expense += Number(item.amount || 0);
      });

      setChartData(Object.values(monthlyMap));
    } catch (error) {
      console.error("Monthly Trend Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading monthly trends..." />;
  }

  return (
    <Card>
      <h2 className="mb-6 text-xl font-bold">
        Monthly Income vs Expenses
      </h2>

      <div className="h-87.5">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#16A34A" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#16A34A" stopOpacity={0} />
              </linearGradient>

              <linearGradient id="expense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DC2626" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Area
              type="monotone"
              dataKey="income"
              stroke="#16A34A"
              fill="url(#income)"
              strokeWidth={3}
            />

            <Area
              type="monotone"
              dataKey="expense"
              stroke="#DC2626"
              fill="url(#expense)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default MonthlyTrendChart;