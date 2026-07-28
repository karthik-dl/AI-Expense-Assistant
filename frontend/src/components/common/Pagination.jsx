import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={clsx(
              "flex h-10 w-10 items-center justify-center rounded-xl text-sm font-medium transition",
              currentPage === page
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            )}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

export default Pagination;