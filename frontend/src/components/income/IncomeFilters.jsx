import { useState } from "react";

function IncomeFilters({ onFilter }) {
  const initialFilters = {
    search: "",
    category: "",
    start_date: "",
    end_date: "",
    min_amount: "",
    max_amount: "",
    sort: "income_date",
  };

  const [filters, setFilters] = useState(initialFilters);

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const applyFilters = () => {
    onFilter?.(filters);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    onFilter?.(initialFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div>
          <label className="block text-sm font-medium mb-2">
            Search
          </label>
          <input
            type="text"
            name="search"
            placeholder="Search..."
            value={filters.search}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Category
          </label>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={filters.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Start Date
          </label>
          <input
            type="date"
            name="start_date"
            value={filters.start_date}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            End Date
          </label>
          <input
            type="date"
            name="end_date"
            value={filters.end_date}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Minimum Amount
          </label>
          <input
            type="number"
            name="min_amount"
            min="0"
            placeholder="Min Amount"
            value={filters.min_amount}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Maximum Amount
          </label>
          <input
            type="number"
            name="max_amount"
            min="0"
            placeholder="Max Amount"
            value={filters.max_amount}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Sort By
          </label>
          <select
            name="sort"
            value={filters.sort}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="income_date">Latest</option>
            <option value="amount">Amount</option>
            <option value="category">Category</option>
          </select>
        </div>

      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={clearFilters}
          className="px-5 py-2 border rounded-lg hover:bg-gray-100 transition"
        >
          Clear
        </button>

        <button
          onClick={applyFilters}
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default IncomeFilters;