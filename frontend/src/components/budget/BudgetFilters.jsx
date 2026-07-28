import SearchBar from "../ui/SearchBar";

function BudgetFilters({
  filters,
  onFilterChange,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Search */}
        <SearchBar
          placeholder="Search category..."
          value={filters.search}
          onChange={(e) =>
            onFilterChange("search", e.target.value)
          }
        />

        {/* Month Filter */}
        <select
          value={filters.month}
          onChange={(e) =>
            onFilterChange("month", e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="">All Months</option>

          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>

        {/* Sort */}
        <select
          value={filters.sort}
          onChange={(e) =>
            onFilterChange("sort", e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
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
    </div>
  );
}

export default BudgetFilters;