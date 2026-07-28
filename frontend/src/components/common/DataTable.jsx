import clsx from "clsx";

function DataTable({
  columns = [],
  data = [],
  emptyMessage = "No data available.",
  loading = false,
  rowKey = "id",
  onRowClick,
}) {
  if (loading) {
    return (
      <div className="flex h-56 items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={clsx(
                    "px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500",
                    column.className
                  )}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-10 text-center text-slate-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row[rowKey]}
                  onClick={() => onRowClick?.(row)}
                  className={clsx(
                    "transition-colors",
                    onRowClick &&
                      "cursor-pointer hover:bg-slate-50"
                  )}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 text-sm text-slate-700"
                    >
                      {column.render
                        ? column.render(row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;