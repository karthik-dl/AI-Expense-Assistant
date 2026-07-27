import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createExpense,
  updateExpense,
} from "../../services/expenseService";

function ExpenseModal({
  open,
  onClose,
  expense,
  refreshExpenses,
}) {
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "",
    expense_date: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (expense) {
      setFormData({
        description: expense.description,
        amount: expense.amount,
        category: expense.category,
        expense_date: expense.expense_date,
      });
    } else {
      setFormData({
        description: "",
        amount: "",
        category: "",
        expense_date: "",
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      if (expense) {
        await updateExpense(expense.id, formData);

        toast.success("Expense updated successfully");
      } else {
        await createExpense(formData);

        toast.success("Expense added successfully");
      }

      refreshExpenses();

      onClose();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8">

        <h2 className="text-2xl font-bold mb-6">
          {expense ? "Edit Expense" : "Add Expense"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Amount
            </label>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Leave empty for AI prediction"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Expense Date
            </label>

            <input
              type="date"
              name="expense_date"
              value={formData.expense_date}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading
                ? "Saving..."
                : expense
                ? "Update Expense"
                : "Add Expense"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExpenseModal;