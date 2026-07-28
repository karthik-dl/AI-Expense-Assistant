import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";
import Pagination from "../../components/ui/Pagination";

import BudgetSummary from "../../components/budget/BudgetSummary";
import BudgetFilters from "../../components/budget/BudgetFilters";
import BudgetCard from "../../components/budget/BudgetCard";
import DeleteBudgetModal from "../../components/budget/DeleteBudgetModal";

import * as budgetService from "../../services/budgetService";

function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBudget, setSelectedBudget] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    month: "",
    sort: "newest",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const loadBudgets = async () => {
    try {
      setLoading(true);

      const { data } = await budgetService.getBudgets();

      setBudgets(data.budgets || data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBudgets();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleDeleteClick = (budget) => {
    setSelectedBudget(budget);
    setDeleteOpen(true);
  };

  const handleCloseModal = () => {
    setDeleteOpen(false);
    setSelectedBudget(null);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filteredBudgets = [...budgets]
    .filter((budget) => {
      const matchesSearch =
        budget.category
          ?.toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesMonth =
        !filters.month ||
        budget.month === filters.month;

      return (
        matchesSearch &&
        matchesMonth
      );
    })
    .sort((a, b) => {
      if (filters.sort === "highest") {
        return Number(b.amount) - Number(a.amount);
      }

      if (filters.sort === "lowest") {
        return Number(a.amount) - Number(b.amount);
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  const totalPages = Math.ceil(
    filteredBudgets.length / itemsPerPage
  );

  const paginatedBudgets = filteredBudgets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PageHeader
          title="Budgets"
          subtitle="Track your monthly budgets."
        />

        <Link to="/budgets/new">
          <Button>
            <Plus size={18} />
            Add Budget
          </Button>
        </Link>
      </div>

      <BudgetFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <BudgetSummary
        budgets={filteredBudgets}
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {paginatedBudgets.map((budget) => (
          <BudgetCard
            key={budget.id}
            budget={budget}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <DeleteBudgetModal
        open={deleteOpen}
        budget={selectedBudget}
        onClose={handleCloseModal}
        onSuccess={loadBudgets}
      />
    </div>
  );
}

export default Budgets;