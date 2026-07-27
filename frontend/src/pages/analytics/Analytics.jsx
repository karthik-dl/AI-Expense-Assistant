import { useEffect, useState } from "react";
import {
  getAnalytics,
  getMonthlyTrend,
  getCategoryAnalytics,
  getIncomeExpenseComparison,
} from "../../services/analyticsService";

import AnalyticsCards from "../../components/analytics/AnalyticsCards";
import SpendingTrendChart from "../../components/analytics/SpendingTrendChart";
import CategoryPieChart from "../../components/analytics/CategoryPieChart";
import MonthlyComparisonChart from "../../components/analytics/MonthlyComparisonChart";
import TopCategories from "../../components/analytics/TopCategories";

const Analytics = () => {
  const [loading, setLoading] = useState(false);

  const [analytics, setAnalytics] = useState({});
  const [trendData, setTrendData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const [
        analyticsRes,
        trendRes,
        categoryRes,
        comparisonRes,
      ] = await Promise.all([
        getAnalytics(),
        getMonthlyTrend(),
        getCategoryAnalytics(),
        getIncomeExpenseComparison(),
      ]);

      setAnalytics(analyticsRes || {});
      setTrendData(trendRes || []);
      setCategoryData(categoryRes || []);
      setComparisonData(comparisonRes || []);
    } catch (error) {
      console.error("Failed to fetch analytics", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg font-semibold">
          Loading Analytics...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Analytics Dashboard
        </h1>
      </div>

      <AnalyticsCards analytics={analytics} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <SpendingTrendChart
          data={trendData}
        />

        <CategoryPieChart
          data={categoryData}
        />

      </div>

      <MonthlyComparisonChart
        data={comparisonData}
      />

      <TopCategories
        categories={categoryData}
      />

    </div>
  );
};

export default Analytics;