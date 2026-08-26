import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#2563EB",
  "#059669",
  "#DC2626",
  "#7C3AED",
  "#EA580C",
  "#0891B2",
  "#CA8A04",
  "#4F46E5",
  "#DB2777",
  "#475569",
];

function CategoryExpenseChart({
  summary = {},
}) {
  const categories =
    Array.isArray(
      summary?.categoryExpenses
    )
      ? summary.categoryExpenses
      : [];

  const data = categories
    .map((item) => ({
      name:
        item?.category || "Others",
      value: Number(
        item?.amount || 0
      ),
    }))
    .filter(
      (item) => item.value > 0
    )
    .sort(
      (a, b) =>
        b.value - a.value
    );

  const totalExpense = data.reduce(
    (sum, item) =>
      sum + item.value,
    0
  );

  return (
    <div className="min-w-0 rounded-3xl bg-white p-5 shadow-sm sm:p-6">

      {/* Header */}
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-800 sm:text-xl">
          Expenses by Category
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          See how your expenses are
          distributed across categories.
        </p>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="flex h-87.5 items-center justify-center text-center text-sm text-slate-500">
          No expense data available
          for this period.
        </div>
      ) : (
        <div className="h-87.5 w-full min-w-0">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>

              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="45%"
                innerRadius="45%"
                outerRadius="70%"
                paddingAngle={3}
              >
                {data.map(
                  (entry, index) => (
                    <Cell
                      key={`${entry.name}-${index}`}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  )
                )}
              </Pie>

              <Tooltip
                formatter={(value) =>
                  `₹${Number(
                    value
                  ).toLocaleString(
                    "en-IN"
                  )}`
                }
                contentStyle={{
                  background:
                    "#ffffff",
                  border:
                    "1px solid #e2e8f0",
                  borderRadius:
                    "10px",
                }}
              />

              <Legend
                verticalAlign="bottom"
                height={50}
                wrapperStyle={{
                  fontSize: "12px",
                }}
              />

            </PieChart>
          </ResponsiveContainer>

        </div>
      )}

      {/* Total */}
      {data.length > 0 && (
        <div className="mt-4 border-t border-slate-100 pt-4 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Total Expenses
          </p>

          <p className="mt-1 text-xl font-bold text-slate-900">
            ₹
            {totalExpense.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>
      )}

    </div>
  );
}

export default CategoryExpenseChart;