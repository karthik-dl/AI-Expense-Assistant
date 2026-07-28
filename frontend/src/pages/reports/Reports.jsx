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
  getReportSummary,
} from "../../services/reportsService";

function Reports() {
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState({});

  const [filters, setFilters] = useState({
    month: "",
    year: new Date().getFullYear(),
  });

  const loadReports = async () => {
    try {
      setLoading(true);

      const { data } =
        await getReportSummary(filters);

      setSummary(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, [filters]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Reports"
        subtitle="Financial reports and analytics."
      />

      <ReportsFilters
        filters={filters}
        setFilters={setFilters}
      />

      <ReportsSummary
        summary={summary}
      />

      <ExportButtons
        filters={filters}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <IncomeExpenseChart
          summary={summary}
        />

        <CategoryExpenseChart
          summary={summary}
        />
      </div>

      <MonthlyTrendChart
        summary={summary}
      />
    </div>
  );
}

export default Reports;