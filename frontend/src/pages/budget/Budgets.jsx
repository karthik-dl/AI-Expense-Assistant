import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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


  const loadBudgets = async () => {
    try {
      setLoading(true);

      const response =
        await budgetService.getBudgets();

      const data = response?.data;

      const list =
        data?.budgets ||
        data?.data?.budgets ||
        (Array.isArray(data)
          ? data
          : []);

      setBudgets(
        Array.isArray(list)
          ? list
          : []
      );
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



  const loadRemaining = async () => {
    try {
      const response =
        await budgetService.getRemainingBudget(
          filters.month,
          filters.year
        );

      const data = response?.data;

      const result =
        data?.budgets ||
        data?.data?.budgets ||
        [];

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


  useEffect(() => {
    loadBudgets();
  }, []);



  useEffect(() => {
    loadRemaining();
  }, [
    filters.month,
    filters.year,
  ]);

  

  const handleFilterChange = (
    field,
    value
  ) => {
    setFilters((previous) => ({
      ...previous,
      [field]: Number.isNaN(
        Number(value)
      )
        ? value
        : Number(value),
    }));
  };



  const filteredBudgets = budgets.filter(
    (budget) => {
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
    }
  );


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
    setBudgets((previous) =>
      previous.filter(
        (budget) =>
          budget.id !==
          selectedBudget?.id
      )
    );

    setRemainingData((previous) =>
      previous.filter(
        (item) =>
          item.category !==
          selectedBudget?.category
      )
    );

    setDeleteOpen(false);
    setSelectedBudget(null);

    await loadBudgets();
    await loadRemaining();
  };

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

      {/* Budget Cards */}
      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-sm text-slate-500">
            Loading budgets...
          </p>
        </div>
      ) : filteredBudgets.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <p className="text-lg font-semibold text-slate-900">
            No budgets found
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Create a budget for{" "}
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