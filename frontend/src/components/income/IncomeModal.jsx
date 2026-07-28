import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createIncome,
  updateIncome,
} from "../../services/incomeService";

function IncomeModal({
  open,
  onClose,
  income,
  refreshIncomes,
}) {
  const [formData, setFormData] = useState({
    source: "",
    category: "",
    amount: "",
    income_date: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (income) {
      setFormData({
        source: income.source || "",
        category: income.category || "",
        amount: income.amount || "",
        income_date: income.income_date || "",
      });
    } else {
      setFormData({
        source: "",
        category: "",
        amount: "",
        income_date: "",
      });
    }
  }, [income]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (income) {
        await updateIncome(income.id, formData);
        toast.success("Income updated successfully");
      } else {
        await createIncome(formData);
        toast.success("Income added successfully");
      }

      if (typeof refreshIncomes === "function") {
        refreshIncomes();
      }

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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold mb-6">
          {income ? "Edit Income" : "Add Income"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">
              Source
            </label>

            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
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
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
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
              min="0"
              step="0.01"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Income Date
            </label>

            <input
              type="date"
              name="income_date"
              value={formData.income_date}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : income
                ? "Update Income"
                : "Add Income"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IncomeModal;