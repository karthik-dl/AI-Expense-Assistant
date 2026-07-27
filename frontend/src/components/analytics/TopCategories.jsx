const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const TopCategories = ({ categories = [] }) => {
  const total = categories.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  if (!categories.length) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          Top Spending Categories
        </h2>

        <div className="text-center text-gray-500 py-8">
          No category data available.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">
        Top Spending Categories
      </h2>

      <div className="space-y-5">
        {categories.slice(0, 5).map((item, index) => {
          const percentage =
            total > 0
              ? (item.amount / total) * 100
              : 0;

          return (
            <div key={item.category || index}>
              <div className="flex justify-between mb-2">
                <span className="font-medium">
                  {item.category}
                </span>

                <div className="text-right">
                  <span className="font-semibold text-red-600">
                    {formatCurrency(item.amount)}
                  </span>

                  <span className="ml-2 text-sm text-gray-500">
                    ({percentage.toFixed(1)}%)
                  </span>
                </div>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCategories;