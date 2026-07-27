import React from "react";

const SummaryCard = ({ title, amount, icon, color }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-5 border-l-4 ${color} hover:shadow-lg transition`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="text-2xl font-bold mt-2">
            ₹ {amount}
          </h2>
        </div>

        <div className="text-4xl">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;