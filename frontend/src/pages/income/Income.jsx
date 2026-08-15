import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import Pagination from "../../components/ui/Pagination";
import Button from "../../components/ui/Button";

import IncomeFilters from "../../components/income/IncomeFilters";
import IncomeSummary from "../../components/income/IncomeSummary";
import IncomeAnalytics from "../../components/income/IncomeAnalytics";
import IncomeTable from "../../components/income/IncomeTable";
import DeleteIncomeModal from "../../components/income/DeleteIncomeModal";

import * as incomeService from "../../services/incomeService";

function Income() {
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedIncome, setSelectedIncome] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    date: "",
    sort: "newest",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

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

  // Handles both date fields safely.
  const getIncomeDate = (income) => {
    return income?.income_date || income?.date || "";
  };

  const loadIncomes = async () => {
    try {
      setLoading(true);

      const response = await incomeService.getIncomes();

      const incomeList = getArray(response, "incomes");

      setIncomes(
        Array.isArray(incomeList)
          ? incomeList
          : []
      );
    } catch (error) {
      console.error(
        "Load Incomes Error:",
        error
      );

      setIncomes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncomes();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleDeleteClick = (income) => {
    setSelectedIncome(income);
    setDeleteOpen(true);
  };

  const handleCloseModal = () => {
    setDeleteOpen(false);
    setSelectedIncome(null);
  };

  const handleFilterChange = (
    field,
    value
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filteredIncomes = [...incomes]
    .filter((income) => {
      const search =
        filters.search.toLowerCase();

      const title =
        income.title?.toLowerCase() || "";

      const category =
        income.category?.toLowerCase() || "";

      const matchesSearch =
        !search ||
        title.includes(search) ||
        category.includes(search);

      const matchesCategory =
        !filters.category ||
        income.category === filters.category;

      const incomeDate =
        getIncomeDate(income);

      const matchesDate =
        !filters.date ||
        incomeDate.startsWith(filters.date);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDate
      );
    })
    .sort((a, b) => {
      const dateA = new Date(
        getIncomeDate(a)
      );

      const dateB = new Date(
        getIncomeDate(b)
      );

      switch (filters.sort) {
        case "highest":
          return (
            Number(b.amount || 0) -
            Number(a.amount || 0)
          );

        case "lowest":
          return (
            Number(a.amount || 0) -
            Number(b.amount || 0)
          );

        case "oldest":
          return dateA - dateB;

        case "newest":
        default:
          return dateB - dateA;
      }
    });

  const totalPages = Math.ceil(
    filteredIncomes.length /
      itemsPerPage
  );

  const paginatedIncomes =
    filteredIncomes.slice(
      (currentPage - 1) *
        itemsPerPage,
      currentPage * itemsPerPage
    );

  return (
    <div className="w-full min-w-0 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Income"
          subtitle="Track and manage your income."
        />

        <Link
          to="/income/new"
          className="w-full sm:w-auto"
        >
          <Button
            className="w-full sm:w-auto"
            leftIcon={<Plus size={18} />}
          >
            Add Income
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <IncomeFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Summary */}
      <IncomeSummary
        incomes={filteredIncomes}
      />

      {/* Analytics */}
      <IncomeAnalytics
        incomes={filteredIncomes}
      />

      {/* Table */}
      <IncomeTable
        incomes={paginatedIncomes}
        loading={loading}
        onDelete={handleDeleteClick}
      />

      {/* Pagination */}
      {totalPages > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      {/* Delete Modal */}
      <DeleteIncomeModal
        open={deleteOpen}
        income={selectedIncome}
        onClose={handleCloseModal}
        onSuccess={loadIncomes}
      />
    </div>
  );
}

export default Income;