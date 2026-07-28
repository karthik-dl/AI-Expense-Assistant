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
  "#16A34A",
  "#DC2626",
  "#9333EA",
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

    if (Array.isArray(response?.data?.[key])) {
      return response.data[key];
    }

    if (Array.isArray(response?.data?.data?.[key])) {
      return response.data.data[key];
    }

    return [];
  };

  const fetchExpenses = async () => {
    try {
      setLoading(true);

      const response = await api.get("/expenses");

      console.log("Expense Response:", response.data);

      const expenses = getArray(response, "expenses");

      const grouped = expenses.reduce((acc, item) => {
        const category = item.category || "Others";

        acc[category] =
          (acc[category] || 0) + Number(item.amount || 0);

        return acc;
      }, {});

      const chartData = Object.entries(grouped).map(
        ([name, value]) => ({
          name,
          value,
        })
      );

      setData(chartData);
    } catch (error) {
      console.error("Expense Pie Chart Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading chart..." />;
  }

  return (
    <Card>
      <h2 className="mb-6 text-xl font-bold">
        Expense by Category
      </h2>

      {data.length === 0 ? (
        <div className="py-20 text-center text-slate-500">
          No expense data available.
        </div>
      ) : (
        <div className="h-87.5">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                innerRadius={70}
                paddingAngle={4}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}

export default ExpensePieChart;