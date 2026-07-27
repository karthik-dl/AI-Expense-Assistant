import { useEffect, useState } from "react";

import MainLayout from "../../components/layout/MainLayout";
import SummaryCard from "../../components/cards/SummaryCard";
import PieChartComponent from "../../components/charts/PieChartComponent";

import {
  getDashboardSummary,
  getCategoryExpenses,
} from "../../services/dashboardService";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      const [summaryRes, categoryRes] = await Promise.all([
        getDashboardSummary(),
        getCategoryExpenses(),
      ]);

      setSummary(summaryRes.summary);
      setCategories(categoryRes.categories);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <p className="text-gray-500">Loading dashboard...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Welcome back! Here's your financial overview.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          title="Total Income"
          value={`₹${summary.total_income.toLocaleString()}`}
          color="#16A34A"
        />

        <SummaryCard
          title="Total Expense"
          value={`₹${summary.total_expense.toLocaleString()}`}
          color="#DC2626"
        />

        <SummaryCard
          title="Net Balance"
          value={`₹${summary.net_balance.toLocaleString()}`}
          color="#2563EB"
        />

        <SummaryCard
          title="Budgets"
          value={summary.total_budgets}
          color="#F59E0B"
        />
      </div>

      {/* Pie Chart */}
      <div className="grid grid-cols-1 gap-6">
        <PieChartComponent data={categories} />
      </div>
    </MainLayout>
  );
}

export default Dashboard;