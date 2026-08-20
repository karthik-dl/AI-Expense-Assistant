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

    if (
      Array.isArray(response?.data?.[key])
    ) {
      return response.data[key];
    }

    if (
      Array.isArray(
        response?.data?.data?.[key]
      )
    ) {
      return response.data.data[key];
    }

    return [];
  };

  const getDate = (item, type) => {
    if (type === "income") {
      return (
        item?.income_date ||
        item?.date ||
        ""
      );
    }

    return (
      item?.expense_date ||
      item?.date ||
      ""
    );
  };

  const calculateTrend = (
    current,
    previous
  ) => {
    if (previous === 0) {
      if (current === 0) {
        return 0;
      }

      return 100;
    }

    return Number(
      (
        ((current - previous) /
          Math.abs(previous)) *
        100
      ).toFixed(1)
    );
  };

  const calculateMonthlyTotal = (
    items,
    type,
    month,
    year
  ) => {
    return items.reduce(
      (total, item) => {
        const dateString = getDate(
          item,
          type
        );

        const date = new Date(
          dateString
        );

        if (isNaN(date.getTime())) {
          return total;
        }

        if (
          date.getMonth() !== month ||
          date.getFullYear() !== year
        ) {
          return total;
        }

        return (
          total +
          Number(item?.amount || 0)
        );
      },
      0
    );
  };

  const fetchOverview = async () => {
    try {
      setLoading(true);

      const [
        incomeRes,
        expenseRes,
      ] = await Promise.all([
        api.get("/incomes"),
        api.get("/expenses"),
      ]);

      const incomeList = getArray(
        incomeRes,
        "incomes"
      );

      const expenseList = getArray(
        expenseRes,
        "expenses"
      );

      const now = new Date();

      const currentMonth =
        now.getMonth();

      const currentYear =
        now.getFullYear();

      const previousDate = new Date(
        currentYear,
        currentMonth - 1,
        1
      );

      const previousMonth =
        previousDate.getMonth();

      const previousYear =
        previousDate.getFullYear();

      

      const currentIncome =
        calculateMonthlyTotal(
          incomeList,
          "income",
          currentMonth,
          currentYear
        );

      const currentExpenses =
        calculateMonthlyTotal(
          expenseList,
          "expense",
          currentMonth,
          currentYear
        );

     

      const previousIncome =
        calculateMonthlyTotal(
          incomeList,
          "income",
          previousMonth,
          previousYear
        );

      const previousExpenses =
        calculateMonthlyTotal(
          expenseList,
          "expense",
          previousMonth,
          previousYear
        );

      

      const currentBalance =
        currentIncome -
        currentExpenses;

      const previousBalance =
        previousIncome -
        previousExpenses;

      

      const currentSavings =
        currentBalance;

      const previousSavings =
        previousBalance;

     
      const incomeTrend =
        calculateTrend(
          currentIncome,
          previousIncome
        );

      const expenseTrend =
        calculateTrend(
          currentExpenses,
          previousExpenses
        );

      const balanceTrend =
        calculateTrend(
          currentBalance,
          previousBalance
        );

      const savingsTrend =
        calculateTrend(
          currentSavings,
          previousSavings
        );

      setStats({
        income: currentIncome,
        expenses: currentExpenses,
        balance: currentBalance,
        savings: currentSavings,

        incomeTrend,
        expenseTrend,
        balanceTrend,
        savingsTrend,
      });
    } catch (error) {
      console.error(
        "Financial Overview Error:",
        error
      );

      setStats({
        balance: 0,
        income: 0,
        expenses: 0,
        savings: 0,
        incomeTrend: 0,
        expenseTrend: 0,
        balanceTrend: 0,
        savingsTrend: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Loader text="Loading overview..." />
    );
  }

  return (
    <section className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

      {/* Monthly Balance */}
      <StatCard
        title="Monthly Balance"
        value={stats.balance}
        icon={Wallet}
        iconColor="bg-blue-50 text-blue-600"
        trend={stats.balanceTrend}
      />

      {/* Monthly Income */}
      <StatCard
        title="Monthly Income"
        value={stats.income}
        icon={Landmark}
        iconColor="bg-emerald-50 text-emerald-600"
        trend={stats.incomeTrend}
      />

      {/* Monthly Expenses */}
      <StatCard
        title="Monthly Expenses"
        value={stats.expenses}
        icon={Receipt}
        iconColor="bg-red-50 text-red-600"
        trend={stats.expenseTrend}
        trendType="negative"
      />

      {/* Monthly Savings */}
      <StatCard
        title="Monthly Savings"
        value={stats.savings}
        icon={PiggyBank}
        iconColor="bg-indigo-50 text-indigo-600"
        trend={stats.savingsTrend}
      />

    </section>
  );
}

export default FinancialOverview;