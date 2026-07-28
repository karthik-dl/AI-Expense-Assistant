import { motion } from "framer-motion";
import CountUp from "react-countup";
import clsx from "clsx";
import { TrendingUp, TrendingDown } from "lucide-react";

function StatCard({
  title,
  value = 0,
  icon: Icon,
  iconColor = "bg-blue-100 text-blue-600",
  trend = 0,
  prefix = "₹",
}) {
  const positive = trend >= 0;

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">
  {prefix}
  {Number(value).toLocaleString("en-IN")}
</h2>

          <div
            className={clsx(
              "mt-4 flex items-center gap-2 text-sm font-medium",
              positive ? "text-green-600" : "text-red-600"
            )}
          >
            {positive ? (
              <TrendingUp size={18} />
            ) : (
              <TrendingDown size={18} />
            )}

            <span>{Math.abs(trend)}% this month</span>
          </div>
        </div>

        <div
          className={clsx(
            "flex h-16 w-16 items-center justify-center rounded-2xl",
            iconColor
          )}
        >
          {typeof Icon === "function" ? (
            <Icon size={30} />
          ) : (
            <span className="text-2xl">💰</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default StatCard;