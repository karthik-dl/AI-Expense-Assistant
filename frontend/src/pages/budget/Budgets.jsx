import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, WalletCards } from "lucide-react";

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

  const [selectedBudget, setSelectedBudget] =
    useState(null);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [filters, setFilters] = useState({
    search: "",
    month: "",
    sort: "newest",
  });

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 6;

  const loadBudgets = async () => {
    try {
      setLoading(true);

      const { data } =
        await budgetService.getBudgets();

      const list =
        data?.budgets ||
        data?.data?.budgets ||
        data ||
        [];

      setBudgets(
        Array.isArray(list) ? list : []
      );
    } catch (error) {
      console.error(
        "Load Budgets Error:",
        error
      );

      setBudgets([]);
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

  const handleFilterChange = (
    field,
    value
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filteredBudgets = [...budgets]
    .filter((budget) => {
      const search =
        filters.search
          .toLowerCase()
          .trim();

      const category =
        budget.category
          ?.toLowerCase() || "";

      const matchesSearch =
        !search ||
        category.includes(search);

      const matchesMonth =
        !filters.month ||
        budget.month ===
          filters.month;

      return (
        matchesSearch &&
        matchesMonth
      );
    })
    .sort((a, b) => {
      if (filters.sort === "highest") {
        return (
          Number(b.amount || 0) -
          Number(a.amount || 0)
        );
      }

      if (filters.sort === "lowest") {
        return (
          Number(a.amount || 0) -
          Number(b.amount || 0)
        );
      }

      const dateA = new Date(
        a.createdAt ||
          a.created_at ||
          0
      );

      const dateB = new Date(
        b.createdAt ||
          b.created_at ||
          0
      );

      return dateB - dateA;
    });

  const totalPages = Math.ceil(
    filteredBudgets.length /
      itemsPerPage
  );

  const paginatedBudgets =
    filteredBudgets.slice(
      (currentPage - 1) *
        itemsPerPage,
      currentPage *
        itemsPerPage
    );

  return (
    <div className="w-full min-w-0 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Budgets"
          subtitle="Plan and monitor your monthly spending."
        />

        <Link
          to="/budgets/new"
          className="w-full sm:w-auto"
        >
          <Button
            className="w-full sm:w-auto"
            leftIcon={<Plus size={18} />}
          >
            Add Budget
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <BudgetFilters
        filters={filters}
        onFilterChange={
          handleFilterChange
        }
      />

      {/* Summary */}
      <BudgetSummary
        budgets={filteredBudgets}
      />

      {/* Budget Cards */}
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-blue-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading budgets...
          </p>
        </div>
      ) : paginatedBudgets.length ===
        0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <WalletCards size={26} />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-slate-900">
            No budgets found
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            Create a budget to start
            planning and monitoring
            your spending.
          </p>

          <Link to="/budgets/new">
            <Button
              className="mt-6"
              leftIcon={
                <Plus size={18} />
              }
            >
              Create Budget
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {paginatedBudgets.map(
            (budget) => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                onDelete={
                  handleDeleteClick
                }
              />
            )
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={
            setCurrentPage
          }
        />
      )}

      {/* Delete */}
      <DeleteBudgetModal
        open={deleteOpen}
        budget={selectedBudget}
        onClose={
          handleCloseModal
        }
        onSuccess={
          loadBudgets
        }
      />
    </div>
  );
}

export default Budgets;