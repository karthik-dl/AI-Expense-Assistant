import { useEffect, useState } from "react";
import {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../../services/budgetService";

import BudgetTable from "../../components/budget/BudgetTable";
import BudgetModal from "../../components/budget/BudgetModal";
import BudgetFilters from "../../components/budget/BudgetFilters";
import ConfirmDialog from "../../components/common/ConfirmDialog";

const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteBudgetId, setDeleteBudgetId] = useState(null);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    month: "",
    year: "",
    page: 1,
    per_page: 10,
  });

  const loadBudgets = async () => {
    try {
      setLoading(true);

      const response = await getBudgets(filters);

      setBudgets(
        response.data?.budgets ||
        response.budgets ||
        []
      );
    } catch (error) {
      console.error("Failed to load budgets", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBudgets();
  }, [filters]);

  const handleSubmit = async (data) => {
    try {
      if (selectedBudget) {
        await updateBudget(selectedBudget.id, data);
      } else {
        await createBudget(data);
      }

      setModalOpen(false);
      setSelectedBudget(null);

      loadBudgets();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBudget(deleteBudgetId);

      setConfirmOpen(false);
      setDeleteBudgetId(null);

      loadBudgets();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Budget Management
        </h1>

        <button
          onClick={() => {
            setSelectedBudget(null);
            setModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Budget
        </button>

      </div>

      <BudgetFilters
        filters={filters}
        onFilterChange={setFilters}
        onClearFilters={() =>
          setFilters({
            search: "",
            category: "",
            month: "",
            year: "",
            page: 1,
            per_page: 10,
          })
        }
      />

      <BudgetTable
        budgets={budgets}
        loading={loading}
        onEdit={(budget) => {
          setSelectedBudget(budget);
          setModalOpen(true);
        }}
        onDelete={(budget) => {
          setDeleteBudgetId(budget.id);
          setConfirmOpen(true);
        }}
      />

      <BudgetModal
        open={modalOpen}
        budget={selectedBudget}
        onClose={() => {
          setModalOpen(false);
          setSelectedBudget(null);
        }}
        onSubmit={handleSubmit}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Budget"
        message="Are you sure you want to delete this budget?"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />

    </div>
  );
};

export default Budgets;