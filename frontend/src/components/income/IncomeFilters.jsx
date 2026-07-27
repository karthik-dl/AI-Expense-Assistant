import { useState } from "react";

function IncomeFilters({ onFilter }) {
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    start_date: "",
    end_date: "",
    min_amount: "",
    max_amount: "",
    sort: "income_date",
  });

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const applyFilters = () => {
    onFilter(filters);
  };

  const clearFilters = () => {
    const reset = {
      search: "",
      category: "",
      start_date: "",
      end_date: "",
      min_amount: "",
      max_amount: "",
      sort: "income_date",
    };

    setFilters(reset);
    onFilter(reset);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <input
          type="text"
          name="search"
          placeholder="Search..."
          value={filters.search}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={filters.category}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="date"
          name="start_date"
          value={filters.start_date}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="date"
          name="end_date"
          value={filters.end_date}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="number"
          name="min_amount"
          placeholder="Min Amount"
          value={filters.min_amount}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
        />

        <input
          type="number"
          name="max_amount"
          placeholder="Max Amount"
          value={filters.max_amount}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
        />

        <select
          name="sort"
          value={filters.sort}
          onChange={handleChange}
          className="border rounded-lg px-4 py-2"
        >
          <option value="income_date">Latest</option>
          <option value="amount">Amount</option>
          <option value="category">Category</option>
        </select>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={clearFilters}
          className="px-5 py-2 border rounded-lg hover:bg-gray-100"
        >
          Clear
        </button>

        <button
          onClick={applyFilters}
          className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Apply Filters
        </button>

      </div>

    </div>
  );
}

export default IncomeFilters;