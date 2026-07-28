import SearchBar from "../ui/SearchBar";

const months = [
  "",
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

function ReportsFilters({
  filters,
  setFilters,
}) {
  const currentYear = new Date().getFullYear();

  const years = [];

  for (let year = currentYear; year >= currentYear - 5; year--) {
    years.push(year);
  }

  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Search */}
        <SearchBar
          placeholder="Search reports..."
          value={filters.search || ""}
          onChange={(e) =>
            handleChange("search", e.target.value)
          }
        />

        {/* Month */}
        <select
          value={filters.month}
          onChange={(e) =>
            handleChange("month", e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="">All Months</option>

          {months
            .filter(Boolean)
            .map((month) => (
              <option
                key={month}
                value={month}
              >
                {month}
              </option>
            ))}
        </select>

        {/* Year */}
        <select
          value={filters.year}
          onChange={(e) =>
            handleChange(
              "year",
              Number(e.target.value)
            )
          }
          className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          {years.map((year) => (
            <option
              key={year}
              value={year}
            >
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ReportsFilters;