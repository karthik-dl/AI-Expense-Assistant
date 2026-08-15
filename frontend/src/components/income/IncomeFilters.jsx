import SearchBar from "../ui/SearchBar";

function IncomeFilters({
  filters,
  onFilterChange,
}) {
  const selectClass =
    "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none transition hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <section className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-slate-900">
          Filter Income
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Search, filter and sort your income.
        </p>
      </div>

      <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SearchBar
          placeholder="Search income..."
          value={filters.search}
          onChange={(value) => {
            const nextValue =
              typeof value === "string"
                ? value
                : value?.target?.value || "";

            onFilterChange(
              "search",
              nextValue
            );
          }}
          onClear={() =>
            onFilterChange(
              "search",
              ""
            )
          }
        />

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

          <option value="Salary">
            Salary
          </option>

          <option value="Freelancing">
            Freelancing
          </option>

          <option value="Business">
            Business
          </option>

          <option value="Investment">
            Investment
          </option>

          <option value="Bonus">
            Bonus
          </option>

          <option value="Rental">
            Rental
          </option>

          <option value="Interest">
            Interest
          </option>

          <option value="Gift">
            Gift
          </option>

          <option value="Others">
            Others
          </option>
        </select>

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
        />

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

export default IncomeFilters;