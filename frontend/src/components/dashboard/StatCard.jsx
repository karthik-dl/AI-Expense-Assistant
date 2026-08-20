import clsx from "clsx";
import {
  TrendingUp,
  TrendingDown,
} from "lucide-react";

function StatCard({
  title,
  value = 0,
  icon: Icon,
  iconColor = "bg-blue-50 text-blue-600",
  trend = 0,
  prefix = "₹",
  trendType = "positive",
}) {
  const numericTrend = Number(trend || 0);

  const isIncrease = numericTrend >= 0;

  const isGood =
    trendType === "negative"
      ? numericTrend <= 0
      : numericTrend >= 0;

  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">
      <div className="flex min-w-0 items-start justify-between gap-4">

        {/* Content */}
        <div className="min-w-0">

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 truncate text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {prefix}
            {Number(value || 0).toLocaleString(
              "en-IN"
            )}
          </h2>

          {/* Trend */}
          <div
            className={clsx(
              "mt-3 flex items-center gap-1.5 text-xs font-medium sm:text-sm",
              isGood
                ? "text-emerald-600"
                : "text-red-600"
            )}
          >
            {isIncrease ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}

            <span>
              {Math.abs(numericTrend)}%
              {" "}
              this month
            </span>
          </div>
        </div>

        {/* Icon */}
        <div
          className={clsx(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12",
            iconColor
          )}
        >
          {Icon ? (
            <Icon
              size={23}
              strokeWidth={2}
            />
          ) : (
            <span className="text-lg">
              ₹
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default StatCard;