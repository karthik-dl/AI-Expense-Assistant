const AIInsightCard = ({ insights = [] }) => {
  if (!insights.length) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          AI Financial Insights
        </h2>

        <div className="text-center text-gray-500 py-8">
          No insights available.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">
        🤖 AI Financial Insights
      </h2>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="border-l-4 border-blue-500 bg-blue-50 rounded-lg p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-blue-700">
                {insight.title}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  insight.priority === "High"
                    ? "bg-red-100 text-red-700"
                    : insight.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {insight.priority}
              </span>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {insight.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsightCard;