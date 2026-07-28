import { Search, X, SlidersHorizontal } from "lucide-react";

function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  onClear,
  showFilter = false,
  onFilterClick,
  className = "",
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex-1">
        {/* Search Icon */}
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-11 text-sm text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {/* Clear */}
        {value && (
          <button
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 transition hover:bg-slate-100"
          >
            <X
              size={16}
              className="text-slate-500"
            />
          </button>
        )}
      </div>

      {/* Filter */}
      {showFilter && (
        <button
          onClick={onFilterClick}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white transition hover:bg-slate-100"
        >
          <SlidersHorizontal size={18} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;