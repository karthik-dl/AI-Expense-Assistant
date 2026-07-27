import { useEffect, useState } from "react";
import { getReports } from "../../services/reportService";

import ReportFilters from "../../components/reports/ReportFilters";
import ReportSummaryCards from "../../components/reports/ReportSummaryCards";
import ReportTable from "../../components/reports/ReportTable";
import ExportButtons from "../../components/reports/ExportButtons";

const Reports = () => {
  const [loading, setLoading] = useState(false);

  const [summary, setSummary] = useState({});

  const [transactions, setTransactions] = useState([]);

  const [filters, setFilters] = useState({
    start_date: "",
    end_date: "",
    category: "",
    type: "",
    search: "",
  });

  const fetchReports = async () => {
    try {
      setLoading(true);

      const response = await getReports(filters);

      setSummary(response.summary || {});
      setTransactions(response.transactions || []);
    } catch (error) {
      console.error("Failed to fetch reports", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [filters]);

  const clearFilters = () => {
    setFilters({
      start_date: "",
      end_date: "",
      category: "",
      type: "",
      search: "",
    });
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center">

        <h1 className="text-3xl font-bold">
          Financial Reports
        </h1>

        <ExportButtons filters={filters} />

      </div>

      <ReportFilters
        filters={filters}
        onFilterChange={setFilters}
        onClear={clearFilters}
      />

      <ReportSummaryCards summary={summary} />

      <ReportTable
        transactions={transactions}
        loading={loading}
      />

    </div>
  );
};

export default Reports;