import { Search, X, SlidersHorizontal } from "lucide-react";

function SearchBar({
  value = "",
  onChange,
  placeholder = "Search...",
  onClear,
  showFilter = false,
  onFilterClick,
  className = "",
}) {
  return (
    <div
      className={`flex w-full items-center gap-2 sm:gap-3 ${className}`}
    >
      <div className="relative min-w-0 flex-1">
        <Search
          size={18}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={value}
          onChange={(event) =>
            onChange?.(event.target.value)
          }
          placeholder={placeholder}
          className="
            h-11 w-full rounded-xl
            border border-slate-200
            bg-white
            pl-10 pr-10
            text-sm text-slate-900
            outline-none
            transition
            placeholder:text-slate-400
            hover:border-slate-300
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
          "
        />

        {value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {showFilter && (
        <button
          type="button"
          onClick={onFilterClick}
          className="
            flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-xl
            border border-slate-200
            bg-white
            text-slate-600
            transition
            hover:bg-slate-50
            hover:text-blue-600
          "
          aria-label="Open filters"
        >
          <SlidersHorizontal size={18} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;