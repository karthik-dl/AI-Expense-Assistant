import {
  FaWallet,
  FaMoneyBillWave,
  FaPiggyBank,
  FaBullseye,
} from "react-icons/fa";

import SummaryCard from "./SummaryCard";

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      <SummaryCard
        title="Total Income"
        amount="45,000"
        icon={<FaMoneyBillWave className="text-green-500" />}
        color="border-green-500"
      />

      <SummaryCard
        title="Total Expenses"
        amount="21,300"
        icon={<FaWallet className="text-red-500" />}
        color="border-red-500"
      />

      <SummaryCard
        title="Balance"
        amount="23,700"
        icon={<FaPiggyBank className="text-blue-500" />}
        color="border-blue-500"
      />

      <SummaryCard
        title="Budget"
        amount="50,000"
        icon={<FaBullseye className="text-yellow-500" />}
        color="border-yellow-500"
      />

    </div>
  );
};

export default DashboardCards;