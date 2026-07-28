import SearchBar from "../ui/SearchBar";

function ExpenseFilters({
  filters,
  onFilterChange,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-4">
        <SearchBar
          placeholder="Search expense..."
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
          className="rounded-xl border border-slate-300 px-4 py-3"
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Bills">Bills</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Fuel">Fuel</option>
          <option value="Education">Education</option>
          <option value="Rent">Rent</option>
          <option value="Others">Others</option>
        </select>

        <input
          type="date"
          value={filters.date}
          onChange={(e) =>
            onFilterChange("date", e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3"
        />

        <select
          value={filters.sort}
          onChange={(e) =>
            onFilterChange("sort", e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3"
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

export default ExpenseFilters;