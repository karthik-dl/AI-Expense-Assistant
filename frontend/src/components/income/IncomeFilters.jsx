import SearchBar from "../ui/SearchBar";

function IncomeFilters({
  filters,
  onFilterChange,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-4">
        <SearchBar
          placeholder="Search income..."
          value={filters.search}
          onChange={(e) =>
            onFilterChange("search", e.target.value)
          }
        />

        <select
          value={filters.category}
          onChange={(e) =>
            onFilterChange("category", e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        >
          <option value="">All Categories</option>
          <option value="Salary">Salary</option>
          <option value="Freelancing">Freelancing</option>
          <option value="Business">Business</option>
          <option value="Investment">Investment</option>
          <option value="Bonus">Bonus</option>
          <option value="Rental">Rental</option>
          <option value="Interest">Interest</option>
          <option value="Gift">Gift</option>
          <option value="Others">Others</option>
        </select>

        <input
          type="date"
          value={filters.date}
          onChange={(e) =>
            onFilterChange("date", e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        />

        <select
          value={filters.sort}
          onChange={(e) =>
            onFilterChange("sort", e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="highest">Highest Amount</option>
          <option value="lowest">Lowest Amount</option>
        </select>
      </div>
    </div>
  );
}

export default IncomeFilters;