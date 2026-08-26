import { useEffect, useState } from "react";

import PageHeader from "../../components/ui/PageHeader";
import Loader from "../../components/ui/Loader";

import ReportsSummary from "../../components/reports/ReportsSummary";
import ReportsFilters from "../../components/reports/ReportsFilters";
import IncomeExpenseChart from "../../components/reports/IncomeExpenseChart";
import CategoryExpenseChart from "../../components/reports/CategoryExpenseChart";
import MonthlyTrendChart from "../../components/reports/MonthlyTrendChart";
import ExportButtons from "../../components/reports/ExportButtons";

import {
  getMonthlyReport,
  getYearlyReport,
  getCategoryAnalysis,
} from "../../services/reportsService";

function Reports() {
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    categoryExpenses: [],
    monthlyTrend: [],
  });

  const [filters, setFilters] = useState({
    month: "",
    year: new Date().getFullYear(),
  });

  const loadReports = async () => {
    try {
      setLoading(true);

      /*
       * ALL MONTHS
       */
      if (!filters.month) {
        const yearlyResponse =
          await getYearlyReport(
            filters.year
          );

        const yearlyData =
          yearlyResponse?.data?.report ||
          [];

        const totalIncome =
          yearlyData.reduce(
            (sum, item) =>
              sum +
              Number(item.income || 0),
            0
          );

        const totalExpense =
          yearlyData.reduce(
            (sum, item) =>
              sum +
              Number(item.expense || 0),
            0
          );

        const monthlyTrend =
          yearlyData.map((item) => ({
            month: getMonthName(
              item.month
            ),
            income: Number(
              item.income || 0
            ),
            expense: Number(
              item.expense || 0
            ),
          }));

        /*
         * Get category data for the
         * selected year.
         *
         * Backend category API requires
         * a month, so when "All Months"
         * is selected we collect categories
         * across all 12 months.
         */

        const categoryResults = [];

        for (let month = 1; month <= 12; month++) {
          try {
            const response =
              await getCategoryAnalysis(
                month,
                filters.year
              );

            const categories =
              response?.data?.categories ||
              [];

            categoryResults.push(
              ...categories
            );
          } catch (error) {
            console.error(
              `Category report failed for month ${month}:`,
              error
            );
          }
        }

        const categoryMap = {};

        categoryResults.forEach(
          (item) => {
            const category =
              item.category ||
              "Others";

            categoryMap[category] =
              (categoryMap[category] || 0) +
              Number(item.amount || 0);
          }
        );

        const categoryExpenses =
          Object.entries(
            categoryMap
          )
            .map(
              ([category, amount]) => ({
                category,
                amount,
              })
            )
            .sort(
              (a, b) =>
                b.amount - a.amount
            );

        setSummary({
          totalIncome,
          totalExpense,
          categoryExpenses,
          monthlyTrend,
        });

        return;
      }

      /*
       * SINGLE MONTH
       */

      const [
        monthlyResponse,
        categoryResponse,
      ] = await Promise.all([
        getMonthlyReport(
          filters.month,
          filters.year
        ),
        getCategoryAnalysis(
          filters.month,
          filters.year
        ),
      ]);

      const report =
        monthlyResponse?.data?.report ||
        {};

      const categories =
        categoryResponse?.data?.categories ||
        [];

      const monthNumber =
        Number(filters.month);

      setSummary({
        totalIncome: Number(
          report.income || 0
        ),

        totalExpense: Number(
          report.expense || 0
        ),

        categoryExpenses: categories,

        /*
         * For a single month,
         * show one point in the chart.
         */
        monthlyTrend: [
          {
            month:
              getMonthName(monthNumber),
            income: Number(
              report.income || 0
            ),
            expense: Number(
              report.expense || 0
            ),
          },
        ],
      });
    } catch (error) {
      console.error(
        "Reports Load Error:",
        error
      );

      setSummary({
        totalIncome: 0,
        totalExpense: 0,
        categoryExpenses: [],
        monthlyTrend: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const getMonthName = (month) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
      months[Number(month) - 1] ||
      "Unknown"
    );
  };

  useEffect(() => {
    loadReports();
  }, [
    filters.month,
    filters.year,
  ]);

  if (loading) {
    return (
      <Loader text="Loading reports..." />
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6 sm:space-y-8">

      {/* Header */}
      <PageHeader
        title="Reports"
        subtitle="Financial reports and analytics."
      />

      {/* Filters */}
      <ReportsFilters
        filters={filters}
        setFilters={setFilters}
      />

      {/* Summary */}
      <ReportsSummary
        summary={summary}
      />

      {/* Export */}
      <ExportButtons
        filters={filters}
      />

      {/* Charts */}
      <div className="grid min-w-0 gap-6 xl:grid-cols-2">

        <IncomeExpenseChart
          summary={summary}
        />

        <CategoryExpenseChart
          summary={summary}
        />

      </div>

      {/* Monthly Trend */}
      <MonthlyTrendChart
        summary={summary}
      />

    </div>
  );
}

export default Reports;