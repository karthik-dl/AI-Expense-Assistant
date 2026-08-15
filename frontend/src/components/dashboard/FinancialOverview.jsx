import { useEffect, useState } from "react";
import {
  Wallet,
  Landmark,
  Receipt,
  PiggyBank,
} from "lucide-react";

import api from "../../services/api";
import Loader from "../ui/Loader";
import StatCard from "./StatCard";

function FinancialOverview() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
    savings: 0,
    incomeTrend: 0,
    expenseTrend: 0,
    balanceTrend: 0,
    savingsTrend: 0,
  });

  useEffect(() => {
    fetchOverview();
  }, []);

  const getArray = (response, key) => {
    if (Array.isArray(response?.data)) {
      return response.data;
    }

    if (Array.isArray(response?.data?.[key])) {
      return response.data[key];
    }

    if (Array.isArray(response?.data?.data?.[key])) {
      return response.data.data[key];
    }

    return [];
  };

  const fetchOverview = async () => {
    try {
      setLoading(true);

      const [incomeRes, expenseRes] = await Promise.all([
        api.get("/incomes"),
        api.get("/expenses"),
      ]);

      const incomeList = getArray(incomeRes, "incomes");
      const expenseList = getArray(expenseRes, "expenses");

      const totalIncome = incomeList.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
      );

      const totalExpense = expenseList.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
      );

      const balance = totalIncome - totalExpense;

      setStats({
        income: totalIncome,
        expenses: totalExpense,
        balance,
        savings: balance,
        incomeTrend: 8.2,
        expenseTrend: -4.3,
        balanceTrend: 10.5,
        savingsTrend: 14.8,
      });
    } catch (error) {
      console.error(
        "Financial Overview Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading overview..." />;
  }

  return (
    <section className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Current Balance"
        value={stats.balance}
        icon={Wallet}
        iconColor="bg-blue-50 text-blue-600"
        trend={stats.balanceTrend}
      />

      <StatCard
        title="Total Income"
        value={stats.income}
        icon={Landmark}
        iconColor="bg-emerald-50 text-emerald-600"
        trend={stats.incomeTrend}
      />

      <StatCard
        title="Total Expenses"
        value={stats.expenses}
        icon={Receipt}
        iconColor="bg-red-50 text-red-600"
        trend={stats.expenseTrend}
      />

      <StatCard
        title="Savings"
        value={stats.savings}
        icon={PiggyBank}
        iconColor="bg-indigo-50 text-indigo-600"
        trend={stats.savingsTrend}
      />
    </section>
  );
}

export default FinancialOverview;