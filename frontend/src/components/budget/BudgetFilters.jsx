function BudgetFilters({
  filters,
  onFilterChange,
}) {
  const currentYear =
    new Date().getFullYear();

  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const selectClass =
    "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">
          Budget Filters
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Select a month, year and category.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">

        {/* Month */}
        <select
          value={filters.month}
          onChange={(e) =>
            onFilterChange(
              "month",
              Number(e.target.value)
            )
          }
          className={selectClass}
        >
          {months.map((month) => (
            <option
              key={month.value}
              value={month.value}
            >
              {month.label}
            </option>
          ))}
        </select>

        {/* Year */}
        <select
          value={filters.year}
          onChange={(e) =>
            onFilterChange(
              "year",
              Number(e.target.value)
            )
          }
          className={selectClass}
        >
          <option value={currentYear - 1}>
            {currentYear - 1}
          </option>

          <option value={currentYear}>
            {currentYear}
          </option>

          <option value={currentYear + 1}>
            {currentYear + 1}
          </option>

          <option value={currentYear + 2}>
            {currentYear + 2}
          </option>
        </select>

        {/* Category */}
        <select
          value={filters.category}
          onChange={(e) =>
            onFilterChange(
              "category",
              e.target.value
            )
          }
          className={selectClass}
        >
          <option value="">
            All Categories
          </option>

          <option value="Food">
            Food
          </option>

          <option value="Transport">
            Transport
          </option>

          <option value="Shopping">
            Shopping
          </option>

          <option value="Entertainment">
            Entertainment
          </option>

          <option value="Bills">
            Bills
          </option>

          <option value="Healthcare">
            Healthcare
          </option>

          <option value="Education">
            Education
          </option>

          <option value="Travel">
            Travel
          </option>

          <option value="Investment">
            Investment
          </option>

          <option value="Others">
            Others
          </option>
        </select>
      </div>
    </div>
  );
}

export default BudgetFilters;