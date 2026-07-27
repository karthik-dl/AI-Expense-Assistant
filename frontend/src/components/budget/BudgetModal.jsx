import { useEffect, useState } from "react";

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

const BudgetModal = ({
  open,
  onClose,
  onSubmit,
  budget,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
    month: "",
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    if (budget) {
      setFormData({
        category: budget.category || "",
        amount: budget.amount || "",
        month: budget.month || "",
        year: budget.year || new Date().getFullYear(),
      });
    } else {
      setFormData({
        category: "",
        amount: "",
        month: "",
        year: new Date().getFullYear(),
      });
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
      alert("Please fill all fields");
      return;
    }

    onSubmit(formData);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-lg">

        <h2 className="text-2xl font-semibold mb-6">
          {budget ? "Edit Budget" : "Add Budget"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block mb-1 font-medium">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
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
            <label className="block mb-1 font-medium">
              Budget Amount
            </label>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
              placeholder="Enter budget amount"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Month
            </label>

            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Select Month</option>

              {[
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
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Year
            </label>

            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
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