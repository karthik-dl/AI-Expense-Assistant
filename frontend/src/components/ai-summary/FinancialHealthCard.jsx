const FinancialHealthCard = ({ health = {} }) => {
  const score = Number(health.score || 0);

  const getColor = () => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-500";
    return "text-red-600";
  };

  const getRingColor = () => {
    if (score >= 80) return "#16A34A";
    if (score >= 60) return "#F59E0B";
    return "#DC2626";
  };

  const getStatus = () => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvement";
  };

  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      <h2 className="text-xl font-semibold mb-6">
        Financial Health Score
      </h2>

      <div className="flex flex-col lg:flex-row items-center gap-8">

        <div className="relative">

          <svg width="140" height="140">

            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="10"
            />

            <circle
              cx="70"
              cy="70"
              r={radius}
              fill="none"
              stroke={getRingColor()}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              transform="rotate(-90 70 70)"
            />

          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <span className={`text-3xl font-bold ${getColor()}`}>
              {score}
            </span>

            <span className="text-sm text-gray-500">
              /100
            </span>

          </div>

        </div>

        <div className="flex-1">

          <h3 className={`text-2xl font-bold mb-2 ${getColor()}`}>
            {getStatus()}
          </h3>

          <p className="text-gray-600 leading-relaxed">
            {health.message ||
              "Maintain healthy spending habits, continue saving consistently, and monitor your monthly expenses to improve your overall financial health."}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">

            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-500">
                Savings Rate
              </p>

              <p className="text-xl font-bold text-green-600">
                {health.savings_rate || 0}%
              </p>
            </div>

            <div className="bg-gray-100 rounded-lg p-4">
              <p className="text-sm text-gray-500">
                Budget Usage
              </p>

              <p className="text-xl font-bold text-blue-600">
                {health.budget_usage || 0}%
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default FinancialHealthCard;