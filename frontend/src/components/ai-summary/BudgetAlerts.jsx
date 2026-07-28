import {
  AlertTriangle,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

import Card from "../ui/Card";

function BudgetAlerts({ summary }) {
  const alerts = summary.budgetAlerts || [];

  const getAlertConfig = (status) => {
    switch (status) {
      case "danger":
        return {
          icon: (
            <AlertTriangle
              size={22}
              className="text-red-600"
            />
          ),
          bg: "bg-red-50",
          border: "border-red-200",
          title: "text-red-700",
        };

      case "warning":
        return {
          icon: (
            <AlertCircle
              size={22}
              className="text-yellow-600"
            />
          ),
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          title: "text-yellow-700",
        };

      default:
        return {
          icon: (
            <CheckCircle
              size={22}
              className="text-green-600"
            />
          ),
          bg: "bg-green-50",
          border: "border-green-200",
          title: "text-green-700",
        };
    }
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">
          Budget Alerts
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Monitor budgets that require your attention.
        </p>
      </div>

      {alerts.length === 0 ? (
        <div className="rounded-2xl bg-slate-50 p-8 text-center text-slate-500">
          🎉 Great! All your budgets are on track.
        </div>
      ) : (
        <div className="space-y-4">
          {alerts.map((alert, index) => {
            const config = getAlertConfig(
              alert.status
            );

            return (
              <div
                key={index}
                className={`flex items-start gap-4 rounded-2xl border p-4 ${config.bg} ${config.border}`}
              >
                <div>{config.icon}</div>

                <div className="flex-1">
                  <h3
                    className={`font-semibold ${config.title}`}
                  >
                    {alert.category}
                  </h3>

                  <p className="mt-1 text-sm text-slate-600">
                    {alert.message}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-4 text-sm">
                    <span>
                      <strong>Budget:</strong> ₹
                      {Number(
                        alert.budget
                      ).toLocaleString("en-IN")}
                    </span>

                    <span>
                      <strong>Spent:</strong> ₹
                      {Number(
                        alert.spent
                      ).toLocaleString("en-IN")}
                    </span>

                    <span>
                      <strong>Usage:</strong>{" "}
                      {alert.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}

export default BudgetAlerts;