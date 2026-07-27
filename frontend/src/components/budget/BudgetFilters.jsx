import { useState } from "react";

const categories = [
  "All",
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
  "All",
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

const BudgetFilters = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const currentYear = new Date().getFullYear();

  const [yearOptions] = useState([
    "All",
    currentYear - 2,
    currentYear - 1,
    currentYear,
    currentYear + 1,
  ]);

  const handleChange = (e) => {
    onFilterChange({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-5 mb-5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <input
          type="text"
          name="search"
          placeholder="Search Category..."
          value={filters.search}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        />

        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        >
          {categories.map((category) => (
            <option
              key={category}
              value={category === "All" ? "" : category}
            >
              {category}
            </option>
          ))}
        </select>

        <select
          name="month"
          value={filters.month}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        >
          {months.map((month) => (
            <option
              key={month}
              value={month === "All" ? "" : month}
            >
              {month}
            </option>
          ))}
        </select>

        <select
          name="year"
          value={filters.year}
          onChange={handleChange}
          className="border rounded-lg px-3 py-2"
        >
          {yearOptions.map((year) => (
            <option
              key={year}
              value={year === "All" ? "" : year}
            >
              {year}
            </option>
          ))}
        </select>

      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={onClearFilters}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default BudgetFilters;