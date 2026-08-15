import SearchBar from "../ui/SearchBar";

function ExpenseFilters({
  filters,
  onFilterChange,
}) {
  const selectClass =
    "h-11 w-full min-w-0 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition-colors duration-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <section className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">
          Filter Expenses
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Search, filter and sort your expenses.
        </p>
      </div>

      {/* Filters */}
      <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {/* Search */}
        <div className="min-w-0">
          <SearchBar
            placeholder="Search expense..."
            value={filters.search}
            onChange={(value) =>
              onFilterChange(
                "search",
                typeof value === "string"
                  ? value
                  : value?.target?.value || ""
              )
            }
            onClear={() =>
              onFilterChange(
                "search",
                ""
              )
            }
          />
        </div>

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
          aria-label="Filter by category"
        >
          <option value="">
            All Categories
          </option>

          <option value="Food">
            Food
          </option>

          <option value="Travel">
            Travel
          </option>

          <option value="Shopping">
            Shopping
          </option>

          <option value="Bills">
            Bills
          </option>

          <option value="Healthcare">
            Healthcare
          </option>

          <option value="Entertainment">
            Entertainment
          </option>

          <option value="Fuel">
            Fuel
          </option>

          <option value="Education">
            Education
          </option>

          <option value="Rent">
            Rent
          </option>

          <option value="Others">
            Others
          </option>
        </select>

        {/* Date */}
        <input
          type="date"
          value={filters.date}
          onChange={(e) =>
            onFilterChange(
              "date",
              e.target.value
            )
          }
          className={selectClass}
          aria-label="Filter by date"
        />

        {/* Sort */}
        <select
          value={filters.sort}
          onChange={(e) =>
            onFilterChange(
              "sort",
              e.target.value
            )
          }
          className={selectClass}
          aria-label="Sort expenses"
        >
          <option value="newest">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="highest">
            Highest Amount
          </option>

          <option value="lowest">
            Lowest Amount
          </option>
        </select>
      </div>
    </section>
  );
}

export default ExpenseFilters;