import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  PieChart,
} from "lucide-react";

import Card from "../ui/Card";

function SpendingInsights({ summary }) {
  const insights =
    summary?.spendingInsights || [];

  const getIcon = (type) => {
    switch (type) {
      case "positive":
        return (
          <TrendingUp
            className="text-green-600"
            size={22}
          />
        );

      case "warning":
        return (
          <AlertTriangle
            className="text-yellow-500"
            size={22}
          />
        );

      case "negative":
        return (
          <TrendingDown
            className="text-red-500"
            size={22}
          />
        );

      default:
        return (
          <PieChart
            className="text-blue-600"
            size={22}
          />
        );
    }
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          AI Spending Insights
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Key observations generated from your
          financial data.
        </p>
      </div>

      {insights.length === 0 ? (
        <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500">
          No spending insights available.
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 p-4 transition hover:shadow-md"
            >
              <div className="rounded-xl bg-slate-100 p-3">
                {getIcon(item.type)}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default SpendingInsights;