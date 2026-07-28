import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Healthcare",
  "Entertainment",
  "Education",
  "Travel",
  "Salary",
  "Investment",
  "Other",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BudgetModal = ({
  open,
  onClose,
  onSubmit,
  budget,
  loading = false,
}) => {
  const initialState = {
    category: "",
    amount: "",
    month: "",
    year: new Date().getFullYear(),
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (budget) {
      setFormData({
        category: budget.category || "",
        amount: budget.amount || "",
        month: budget.month || "",
        year: budget.year || new Date().getFullYear(),
      });
    } else {
      setFormData(initialState);
    }
  }, [budget]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.category ||
      !formData.amount ||
      !formData.month ||
      !formData.year
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (Number(formData.amount) <= 0) {
      toast.error("Budget amount must be greater than 0");
      return;
    }

    onSubmit(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

        <h2 className="text-2xl font-bold mb-6">
          {budget ? "Edit Budget" : "Add Budget"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>

              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Budget Amount
            </label>

            <input
              type="number"
              name="amount"
              min="1"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter budget amount"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Month
            </label>

            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Month</option>

              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Year
            </label>

            <input
              type="number"
              name="year"
              min="2020"
              value={formData.year}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="px-5 py-2 rounded-lg border hover:bg-gray-100 transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : budget
                ? "Update Budget"
                : "Add Budget"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default BudgetModal;