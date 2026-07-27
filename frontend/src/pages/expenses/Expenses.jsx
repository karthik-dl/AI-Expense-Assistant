import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import MainLayout from "../../components/layout/MainLayout";

import ExpenseFilters from "../../components/expense/ExpenseFilters";
import ExpenseTable from "../../components/expense/ExpenseTable";
import ExpenseModal from "../../components/expense/ExpenseModal";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import {
  getExpenses,
  deleteExpense,
} from "../../services/expenseService";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadExpenses = async (
    page = currentPage,
    currentFilters = filters
  ) => {
    try {
      setLoading(true);

      const response = await getExpenses({
        page,
        per_page: 10,
        ...currentFilters,
      });

      setExpenses(response.data.expenses);
      setPagination(response.data.pagination);
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    loadExpenses(1, newFilters);
  };

  const handleAddExpense = () => {
    setSelectedExpense(null);
    setOpenModal(true);
  };

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    setOpenModal(true);
  };

  const handleDeleteExpense = (id) => {
    setExpenseToDelete(id);
    setShowDeleteDialog(true);
  };

  const confirmDeleteExpense = async () => {
    try {
      setDeleteLoading(true);

      await deleteExpense(expenseToDelete);

      toast.success("Expense deleted successfully");

      setShowDeleteDialog(false);
      setExpenseToDelete(null);

      loadExpenses(currentPage);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete expense");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Expenses
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all your expenses.
          </p>
        </div>

        <button
          onClick={handleAddExpense}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Add Expense
        </button>
      </div>

      <ExpenseFilters
        onFilter={handleFilter}
      />

      {loading ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          Loading expenses...
        </div>
      ) : (
        <ExpenseTable
          expenses={expenses}
          pagination={pagination}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
          onPageChange={loadExpenses}
        />
      )}

      <ExpenseModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        expense={selectedExpense}
        refreshExpenses={() => loadExpenses(currentPage)}
      />

      <ConfirmDialog
        open={showDeleteDialog}
        title="Delete Expense"
        message="Are you sure you want to delete this expense? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteLoading}
        onCancel={() => {
          setShowDeleteDialog(false);
          setExpenseToDelete(null);
        }}
        onConfirm={confirmDeleteExpense}
      />
    </MainLayout>
  );
}

export default Expenses;