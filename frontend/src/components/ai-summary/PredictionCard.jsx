import {
  TrendingUp,
  TrendingDown,
  ShieldAlert,
} from "lucide-react";

import Card from "../ui/Card";

function PredictionCard({ summary }) {
  const prediction = summary.prediction || {};

  const predictedExpense = Number(
    prediction.predictedExpense || 0
  );

  const predictedSavings = Number(
    prediction.predictedSavings || 0
  );

  const confidence = Number(
    prediction.confidence || 0
  );

  const risk = prediction.risk || "Low";

  const riskStyles = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            AI Prediction
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Forecast based on your spending pattern.
          </p>
        </div>

        <div
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            riskStyles[risk] ||
            riskStyles.Low
          }`}
        >
          {risk} Risk
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="mb-2 flex items-center gap-2">
            <TrendingDown
              className="text-red-500"
              size={20}
            />

            <span className="font-medium">
              Predicted Expenses
            </span>
          </div>

          <p className="text-2xl font-bold text-red-600">
            ₹
            {predictedExpense.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-5">
          <div className="mb-2 flex items-center gap-2">
            <TrendingUp
              className="text-green-500"
              size={20}
            />

            <span className="font-medium">
              Predicted Savings
            </span>
          </div>

          <p className="text-2xl font-bold text-green-600">
            ₹
            {predictedSavings.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-blue-50 p-5">
        <div className="mb-3 flex items-center gap-2">
          <ShieldAlert
            className="text-blue-600"
            size={20}
          />

          <span className="font-semibold text-slate-700">
            AI Confidence
          </span>
        </div>

        <div className="mb-2 h-3 overflow-hidden rounded-full bg-blue-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-700"
            style={{
              width: `${confidence}%`,
            }}
          />
        </div>

        <p className="text-sm text-slate-600">
          {confidence}% confidence based on your
          historical income and expense data.
        </p>
      </div>
    </Card>
  );
}

export default PredictionCard;