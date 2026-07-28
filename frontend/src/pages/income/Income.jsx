import { useEffect, useState } from "react";

import PageHeader from "../../components/ui/PageHeader";
import Pagination from "../../components/ui/Pagination";

import IncomeFilters from "../../components/income/IncomeFilters";
import IncomeSummary from "../../components/income/IncomeSummary";
import IncomeAnalytics from "../../components/income/IncomeAnalytics";
import IncomeTable from "../../components/income/IncomeTable";
import DeleteIncomeModal from "../../components/income/DeleteIncomeModal";

import * as incomeService from "../../services/incomeService";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import Button from "../../components/ui/Button";

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

  const loadIncomes = async () => {
    try {
      setLoading(true);

      const response = await incomeService.getIncomes();

      console.log("Income API:", response.data);

      const incomeList = getArray(response, "incomes");

      setIncomes(incomeList);
    } catch (error) {
      console.error("Load Incomes Error:", error);
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

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filteredIncomes = incomes
    .filter((income) => {
      const matchesSearch =
        income.title
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        income.category
          ?.toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesCategory =
        !filters.category ||
        income.category === filters.category;

      const matchesDate =
        !filters.date ||
        income.income_date?.startsWith(filters.date);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDate
      );
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case "highest":
          return Number(b.amount) - Number(a.amount);

        case "lowest":
          return Number(a.amount) - Number(b.amount);

        case "oldest":
          return (
            new Date(a.income_date) -
            new Date(b.income_date)
          );

        default:
          return (
            new Date(b.income_date) -
            new Date(a.income_date)
          );
      }
    });

  const totalPages = Math.ceil(
    filteredIncomes.length / itemsPerPage
  );

  const paginatedIncomes = filteredIncomes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PageHeader
          title="Income"
          subtitle="Manage all your income."
        />

        <Link to="/income/new">
          <Button>
            <Plus size={18} />
            Add Income
          </Button>
        </Link>
      </div>

      <IncomeFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <IncomeSummary
        incomes={filteredIncomes}
      />

      <IncomeAnalytics
        incomes={filteredIncomes}
      />

      <IncomeTable
        incomes={paginatedIncomes}
        loading={loading}
        onDelete={handleDeleteClick}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

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