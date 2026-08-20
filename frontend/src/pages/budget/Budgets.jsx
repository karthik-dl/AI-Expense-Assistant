import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

import PageHeader from "../../components/ui/PageHeader";
import Button from "../../components/ui/Button";

import BudgetCard from "../../components/budget/BudgetCard";
import BudgetFilters from "../../components/budget/BudgetFilters";
import BudgetSummary from "../../components/budget/BudgetSummary";
import DeleteBudgetModal from "../../components/budget/DeleteBudgetModal";

import * as budgetService from "../../services/budgetService";

function Budgets() {
  const today = new Date();
  const location = useLocation();

  const [budgets, setBudgets] = useState([]);
  const [remainingData, setRemainingData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedBudget, setSelectedBudget] =
    useState(null);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [filters, setFilters] = useState({
    month: today.getMonth() + 1,
    year: today.getFullYear(),
    category: "",
  });

  /* ================================
     LOAD BUDGETS
  ================================= */

  const loadBudgets = async () => {
    try {
      setLoading(true);

      const response =
        await budgetService.getBudgets();

      console.log(
        "GET /budgets:",
        response?.data
      );

      const data = response?.data;

      let list = [];

      if (Array.isArray(data)) {
        list = data;
      } else if (
        Array.isArray(data?.budgets)
      ) {
        list = data.budgets;
      } else if (
        Array.isArray(data?.data?.budgets)
      ) {
        list = data.data.budgets;
      } else if (
        Array.isArray(data?.data)
      ) {
        list = data.data;
      }

      console.log(
        "Budgets received:",
        list
      );

      setBudgets(list);
    } catch (error) {
      console.error(
        "Load Budgets Error:",
        error
      );

      setBudgets([]);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load budgets."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================================
     LOAD REMAINING
  ================================= */

  const loadRemaining = async () => {
    try {
      const response =
        await budgetService.getRemainingBudget(
          Number(filters.month),
          Number(filters.year)
        );

      console.log(
        "Remaining Budget:",
        response?.data
      );

      const data = response?.data;

      let result = [];

      if (
        Array.isArray(data?.budgets)
      ) {
        result = data.budgets;
      } else if (
        Array.isArray(data?.data?.budgets)
      ) {
        result = data.data.budgets;
      } else if (
        Array.isArray(data?.data)
      ) {
        result = data.data;
      }

      setRemainingData(
        Array.isArray(result)
          ? result
          : []
      );
    } catch (error) {
      console.error(
        "Load Remaining Budget Error:",
        error
      );

      setRemainingData([]);
    }
  };

  /* ================================
     INITIAL LOAD
  ================================= */

  useEffect(() => {
    loadBudgets();
  }, []);

  /* ================================
     REFRESH WHEN RETURNING TO PAGE
  ================================= */

  useEffect(() => {
    loadBudgets();
  }, [location.key]);

  /* ================================
     LOAD REMAINING WHEN FILTER CHANGES
  ================================= */

  useEffect(() => {
    loadRemaining();
  }, [
    filters.month,
    filters.year,
  ]);

  /* ================================
     FILTER CHANGE
  ================================= */

  const handleFilterChange = (
    field,
    value
  ) => {
    setFilters((previous) => ({
      ...previous,
      [field]:
        field === "category"
          ? value
          : Number(value),
    }));
  };

  /* ================================
     FILTER BUDGETS
  ================================= */

  const filteredBudgets =
    budgets.filter((budget) => {
      const matchesMonth =
        Number(budget.month) ===
        Number(filters.month);

      const matchesYear =
        Number(budget.year) ===
        Number(filters.year);

      const matchesCategory =
        !filters.category ||
        budget.category ===
          filters.category;

      return (
        matchesMonth &&
        matchesYear &&
        matchesCategory
      );
    });

  /* ================================
     GET SPENT
  ================================= */

  const getSpent = (budget) => {
    const data =
      remainingData.find(
        (item) =>
          item.category ===
          budget.category
      );

    return Number(
      data?.spent || 0
    );
  };

  /* ================================
     DELETE
  ================================= */

  const handleDeleteClick = (
    budget
  ) => {
    setSelectedBudget(budget);
    setDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setSelectedBudget(null);
  };

  const handleDeleteSuccess = async () => {
    setDeleteOpen(false);

    setSelectedBudget(null);

    await loadBudgets();

    await loadRemaining();
  };

  /* ================================
     RENDER
  ================================= */

  return (
    <div className="w-full min-w-0 space-y-6 sm:space-y-8">

      {/* Header */}
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <PageHeader
          title="Budgets"
          subtitle="Plan and manage your monthly spending limits."
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
        remainingData={remainingData}
      />

      {/* Loading */}
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-sm text-slate-500">
            Loading budgets...
          </p>
        </div>
      ) : filteredBudgets.length === 0 ? (

        /* Empty */
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">

          <p className="text-lg font-semibold text-slate-900">
            No budgets found
          </p>

          <p className="mt-2 text-sm text-slate-500">
            No budget exists for{" "}
            {filters.month}/
            {filters.year}.
          </p>

          <Link to="/budgets/new">
            <Button
              className="mt-5"
              leftIcon={<Plus size={18} />}
            >
              Add Budget
            </Button>
          </Link>
        </div>

      ) : (

        /* Budget Cards */
        <div className="grid min-w-0 gap-5 sm:grid-cols-2 xl:grid-cols-3">

          {filteredBudgets.map(
            (budget) => (
              <div
                key={budget.id}
                className="min-w-0"
              >

                <BudgetCard
                  budget={budget}
                  spent={getSpent(
                    budget
                  )}
                />

                <div className="mt-3 flex justify-end gap-2">

                  <Link
                    to={`/budgets/${budget.id}/edit`}
                  >
                    <Button
                      variant="secondary"
                      size="sm"
                    >
                      Edit
                    </Button>
                  </Link>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() =>
                      handleDeleteClick(
                        budget
                      )
                    }
                  >
                    Delete
                  </Button>

                </div>

              </div>
            )
          )}

        </div>
      )}

      {/* Delete Modal */}
      <DeleteBudgetModal
        open={deleteOpen}
        budget={selectedBudget}
        onClose={handleCloseDelete}
        onSuccess={
          handleDeleteSuccess
        }
      />

    </div>
  );
}

export default Budgets;