import React from "react";

const categories = [
  "",
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

const transactionTypes = [
  "",
  "Income",
  "Expense",
];

const ReportFilters = ({
  filters,
  onFilterChange,
  onClear,
}) => {
  const handleChange = (e) => {
    onFilterChange({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 mb-6">

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

        <div>
          <label className="block text-sm font-medium mb-1">
            Start Date
          </label>

          <input
            type="date"
            name="start_date"
            value={filters.start_date}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            End Date
          </label>

          <input
            type="date"
            name="end_date"
            value={filters.end_date}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Category
          </label>

          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">All Categories</option>

            {categories
              .filter((c) => c)
              .map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Type
          </label>

          <select
            name="type"
            value={filters.type}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="">All Types</option>

            {transactionTypes
              .filter((t) => t)
              .map((type) => (
                <option
                  key={type}
                  value={type}
                >
                  {type}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Search
          </label>

          <input
            type="text"
            name="search"
            placeholder="Description..."
            value={filters.search}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

      </div>

      <div className="flex justify-end mt-5">
        <button
          onClick={onClear}
          className="px-5 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
        >
          Clear Filters
        </button>
      </div>

    </div>
  );
};

export default ReportFilters;