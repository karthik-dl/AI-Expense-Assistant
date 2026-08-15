import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

import PageHeader from "../../components/ui/PageHeader";
import Pagination from "../../components/ui/Pagination";
import Button from "../../components/ui/Button";

import ExpenseFilters from "../../components/expense/ExpenseFilters";
import ExpenseSummary from "../../components/expense/ExpenseSummary";
import ExpenseTable from "../../components/expense/ExpenseTable";
import DeleteExpenseModal from "../../components/expense/DeleteExpenseModal";
import ExpenseAnalytics from "../../components/expense/ExpenseAnalytics";

import * as expenseService from "../../services/expenseService";

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedExpense, setSelectedExpense] =
    useState(null);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    date: "",
    sort: "newest",
  });

  const [currentPage, setCurrentPage] =
    useState(1);

  const itemsPerPage = 10;

  /* -----------------------------
     Load Expenses
  ----------------------------- */

  const loadExpenses = async () => {
    try {
      setLoading(true);

      const { data } =
        await expenseService.getExpenses();

      const list =
        data?.expenses ||
        data?.data?.expenses ||
        (Array.isArray(data)
          ? data
          : []);

      setExpenses(
        Array.isArray(list)
          ? list
          : []
      );
    } catch (error) {
      console.error(
        "Load Expenses Error:",
        error
      );

      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  /* -----------------------------
     Reset Pagination
  ----------------------------- */

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  /* -----------------------------
     Delete
  ----------------------------- */

  const handleDeleteClick = (expense) => {
    setSelectedExpense(expense);
    setDeleteOpen(true);
  };

  const handleCloseModal = () => {
    setDeleteOpen(false);
    setSelectedExpense(null);
  };

  /* -----------------------------
     Filters
  ----------------------------- */

  const handleFilterChange = (
    field,
    value
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /* -----------------------------
     Filter + Sort
  ----------------------------- */

  const filteredExpenses = [...expenses]
    .filter((expense) => {
      const search =
        filters.search
          ?.toLowerCase()
          .trim() || "";

      const title =
        expense.title
          ?.toLowerCase() || "";

      const category =
        expense.category
          ?.toLowerCase() || "";

      const matchesSearch =
        !search ||
        title.includes(search) ||
        category.includes(search);

      const matchesCategory =
        !filters.category ||
        expense.category ===
          filters.category;

      const matchesDate =
        !filters.date ||
        expense.date?.startsWith(
          filters.date
        );

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDate
      );
    })
    .sort((a, b) => {
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
          return (
            new Date(a.date) -
            new Date(b.date)
          );

        case "newest":
        default:
          return (
            new Date(b.date) -
            new Date(a.date)
          );
      }
    });

  /* -----------------------------
     Pagination
  ----------------------------- */

  const totalPages = Math.ceil(
    filteredExpenses.length /
      itemsPerPage
  );

  const paginatedExpenses =
    filteredExpenses.slice(
      (currentPage - 1) *
        itemsPerPage,
      currentPage * itemsPerPage
    );

  return (
    <div className="w-full min-w-0 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <PageHeader
            title="Expenses"
            subtitle="Track and manage your expenses."
          />
        </div>

        <Link
          to="/expenses/new"
          className="w-full sm:w-auto"
        >
          <Button
            className="w-full sm:w-auto"
            leftIcon={<Plus size={18} />}
          >
            Add Expense
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <ExpenseFilters
        filters={filters}
        onFilterChange={
          handleFilterChange
        }
      />

      {/* Summary */}
      <ExpenseSummary
        expenses={filteredExpenses}
      />

      {/* Analytics */}
      <ExpenseAnalytics
        expenses={filteredExpenses}
      />

      {/* Expense Table */}
      <ExpenseTable
        expenses={paginatedExpenses}
        loading={loading}
        onDelete={handleDeleteClick}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {/* Delete Modal */}
      <DeleteExpenseModal
        open={deleteOpen}
        expense={selectedExpense}
        onClose={handleCloseModal}
        onSuccess={loadExpenses}
      />
    </div>
  );
}

export default Expenses;