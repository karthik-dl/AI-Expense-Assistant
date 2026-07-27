const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const SpendingPrediction = ({ prediction = {} }) => {
  const confidence = Number(prediction.confidence || 0);

  const getTrend = () => {
    switch (prediction.trend) {
      case "Increasing":
        return {
          icon: "📈",
          color: "text-red-600",
          bg: "bg-red-100",
        };

      case "Decreasing":
        return {
          icon: "📉",
          color: "text-green-600",
          bg: "bg-green-100",
        };

      default:
        return {
          icon: "➡️",
          color: "text-blue-600",
          bg: "bg-blue-100",
        };
    }
  };

  const trend = getTrend();

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-semibold mb-6">
        📈 AI Spending Prediction
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div>

          <p className="text-gray-500 mb-2">
            Predicted Next Month Spending
          </p>

          <h1 className="text-4xl font-bold text-indigo-600 mb-5">
            {formatCurrency(prediction.predicted_amount)}
          </h1>

          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${trend.bg}`}
          >
            <span className="text-xl">
              {trend.icon}
            </span>

            <span className={`font-semibold ${trend.color}`}>
              {prediction.trend || "Stable"}
            </span>
          </div>

        </div>

        <div>

          <div className="mb-4 flex justify-between">
            <span className="font-medium">
              Prediction Confidence
            </span>

            <span className="font-bold">
              {confidence}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-700"
              style={{
                width: `${confidence}%`,
              }}
            />
          </div>

          <div className="mt-6 p-4 rounded-lg bg-gray-50 border">
            <h3 className="font-semibold mb-2">
              AI Explanation
            </h3>

            <p className="text-gray-600 leading-relaxed">
              {prediction.message ||
                "Prediction is based on your historical spending pattern, recent transactions, category trends, and monthly financial behaviour."}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default SpendingPrediction;