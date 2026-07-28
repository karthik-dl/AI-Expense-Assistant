import { useEffect, useState } from "react";

import PageHeader from "../../components/ui/PageHeader";
import Pagination from "../../components/ui/Pagination";

import ExpenseFilters from "../../components/expense/ExpenseFilters";
import ExpenseSummary from "../../components/expense/ExpenseSummary";
import ExpenseTable from "../../components/expense/ExpenseTable";
import DeleteExpenseModal from "../../components/expense/DeleteExpenseModal";

import * as expenseService from "../../services/expenseService";

import ExpenseAnalytics from "../../components/expense/ExpenseAnalytics";
function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedExpense, setSelectedExpense] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    date: "",
    sort: "newest",
  });

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const loadExpenses = async () => {
    try {
      setLoading(true);

      const { data } = await expenseService.getExpenses();

      setExpenses(data.expenses || data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const handleDeleteClick = (expense) => {
    setSelectedExpense(expense);
    setDeleteOpen(true);
  };

  const handleCloseModal = () => {
    setDeleteOpen(false);
    setSelectedExpense(null);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filteredExpenses = [...expenses]
    .filter((expense) => {
      const matchesSearch =
        expense.title
          ?.toLowerCase()
          .includes(filters.search.toLowerCase()) ||
        expense.category
          ?.toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesCategory =
        !filters.category ||
        expense.category === filters.category;

      const matchesDate =
        !filters.date ||
        expense.date?.startsWith(filters.date);

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
          return new Date(a.date) - new Date(b.date);

        case "newest":
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

  const totalPages = Math.ceil(
    filteredExpenses.length / itemsPerPage
  );

  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Expenses"
        subtitle="Manage all your expenses."
      />

      <ExpenseFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <ExpenseSummary
  expenses={filteredExpenses}
/>

<ExpenseAnalytics
  expenses={filteredExpenses}
/>

<ExpenseTable
  expenses={paginatedExpenses}
  loading={loading}
  onDelete={handleDeleteClick}
/>

      <ExpenseTable
        expenses={paginatedExpenses}
        loading={loading}
        onDelete={handleDeleteClick}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

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