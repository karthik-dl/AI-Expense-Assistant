import SearchBar from "../ui/SearchBar";

function BudgetFilters({
  filters,
  onFilterChange,
}) {
  const selectClass =
    "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <section className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">
          Budget Filters
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Find and sort your budgets.
        </p>
      </div>

      <div className="grid min-w-0 gap-3 md:grid-cols-3">
        <SearchBar
          placeholder="Search category..."
          value={filters.search}
          onChange={(value) => {
            const nextValue =
              typeof value === "string"
                ? value
                : value?.target?.value ||
                  "";

            onFilterChange(
              "search",
              nextValue
            );
          }}
        />

        <select
          value={filters.month}
          onChange={(e) =>
            onFilterChange(
              "month",
              e.target.value
            )
          }
          className={selectClass}
        >
          <option value="">
            All Months
          </option>

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
            <option
              key={month}
              value={month}
            >
              {month}
            </option>
          ))}
        </select>

        <select
          value={filters.sort}
          onChange={(e) =>
            onFilterChange(
              "sort",
              e.target.value
            )
          }
          className={selectClass}
        >
          <option value="newest">
            Newest First
          </option>

          <option value="highest">
            Highest Budget
          </option>

          <option value="lowest">
            Lowest Budget
          </option>
        </select>
      </div>
    </section>
  );
}

export default BudgetFilters;