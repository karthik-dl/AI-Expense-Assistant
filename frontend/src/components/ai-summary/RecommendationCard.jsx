const getPriorityStyle = (priority) => {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700";
    case "Medium":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-green-100 text-green-700";
  }
};

const getCategoryIcon = (category) => {
  switch (category) {
    case "Savings":
      return "💰";
    case "Budget":
      return "📊";
    case "Investment":
      return "📈";
    case "Spending":
      return "💳";
    default:
      return "💡";
  }
};

const RecommendationCard = ({ recommendations = [] }) => {
  if (!recommendations.length) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          AI Recommendations
        </h2>

        <div className="text-center text-gray-500 py-8">
          No recommendations available.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">
        💡 AI Recommendations
      </h2>

      <div className="space-y-5">
        {recommendations.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {getCategoryIcon(item.category)}
                </span>

                <div>
                  <h3 className="font-semibold text-lg">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.category}
                  </p>
                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityStyle(
                  item.priority
                )}`}
              >
                {item.priority}
              </span>
            </div>

            <p className="text-gray-700 mb-4">
              {item.description}
            </p>

            <div className="flex justify-between items-center border-t pt-3">
              <span className="text-sm text-gray-500">
                Estimated Impact
              </span>

              <span className="font-semibold text-green-600">
                {item.impact || "High"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationCard;