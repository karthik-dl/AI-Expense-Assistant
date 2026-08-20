import { useEffect, useState } from "react";
import {
  Wallet,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

import api from "../../services/api";

import Card from "../ui/Card";
import Loader from "../ui/Loader";

function BudgetOverview() {
  const today = new Date();

  const [loading, setLoading] = useState(true);

  const [budgets, setBudgets] = useState([]);
  const [remainingData, setRemainingData] =
    useState([]);

  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  const getArray = (response, key) => {
    if (Array.isArray(response?.data)) {
      return response.data;
    }

    if (Array.isArray(response?.data?.[key])) {
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

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        setLoading(true);

        const [
          budgetsResponse,
          remainingResponse,
        ] = await Promise.all([
          api.get("/budgets"),
          api.get("/budgets/remaining", {
            params: {
              month,
              year,
            },
          }),
        ]);

        const allBudgets = getArray(
          budgetsResponse,
          "budgets"
        );

        const remaining = getArray(
          remainingResponse,
          "budgets"
        );

        const currentBudgets =
          allBudgets.filter(
            (budget) =>
              Number(budget.month) === month &&
              Number(budget.year) === year
          );

        setBudgets(currentBudgets);
        setRemainingData(remaining);
      } catch (error) {
        console.error(
          "Dashboard Budget Error:",
          error
        );

        setBudgets([]);
        setRemainingData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetData();
  }, [month, year]);

  if (loading) {
    return (
      <Card hover={false}>
        <Loader text="Loading budget overview..." />
      </Card>
    );
  }

  if (budgets.length === 0) {
    return (
      <Card hover={false}>
        <div className="flex min-h-40 flex-col items-center justify-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Wallet size={22} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-slate-900">
            No budget set
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            You haven't created a budget for
            this month yet.
          </p>
        </div>
      </Card>
    );
  }

  const getBudgetData = (budget) => {
    return remainingData.find(
      (item) =>
        item.category === budget.category
    );
  };

  const totalBudget = budgets.reduce(
    (total, budget) =>
      total + Number(budget.amount || 0),
    0
  );

  const totalSpent = budgets.reduce(
    (total, budget) => {
      const data = getBudgetData(budget);

      return (
        total +
        Number(data?.spent || 0)
      );
    },
    0
  );

  const totalRemaining =
    totalBudget - totalSpent;

  const utilization =
    totalBudget > 0
      ? Math.round(
          (totalSpent / totalBudget) * 100
        )
      : 0;

  return (
    <Card hover={false}>
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
            Budget Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your budget progress for this month.
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Wallet size={20} />
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-3 sm:grid-cols-3">

        {/* Budget */}
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-medium text-slate-500">
            Total Budget
          </p>

          <p className="mt-1 text-lg font-bold text-slate-900">
            ₹
            {totalBudget.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>

        {/* Spent */}
        <div className="rounded-xl bg-red-50 p-4">
          <p className="text-xs font-medium text-red-600">
            Total Spent
          </p>

          <p className="mt-1 text-lg font-bold text-red-700">
            ₹
            {totalSpent.toLocaleString(
              "en-IN"
            )}
          </p>
        </div>

        {/* Remaining */}
        <div className="rounded-xl bg-emerald-50 p-4">
          <p className="text-xs font-medium text-emerald-600">
            Remaining
          </p>

          <p
            className={`mt-1 text-lg font-bold ${
              totalRemaining < 0
                ? "text-red-600"
                : "text-emerald-700"
            }`}
          >
            ₹
            {Math.abs(
              totalRemaining
            ).toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="mt-6">

        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp
              size={16}
              className="text-blue-600"
            />

            <span className="text-sm font-semibold text-slate-700">
              Overall Usage
            </span>
          </div>

          <span
            className={`text-sm font-bold ${
              utilization > 100
                ? "text-red-600"
                : utilization >= 80
                ? "text-amber-600"
                : "text-emerald-600"
            }`}
          >
            {utilization}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full transition-all ${
              utilization > 100
                ? "bg-red-500"
                : utilization >= 80
                ? "bg-amber-500"
                : "bg-emerald-500"
            }`}
            style={{
              width: `${Math.min(
                utilization,
                100
              )}%`,
            }}
          />
        </div>

        {utilization > 100 && (
          <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-600">
            <AlertTriangle size={14} />
            You have exceeded your total budget.
          </div>
        )}
      </div>

      {/* Category Progress */}
      <div className="mt-6 space-y-4">

        <h3 className="text-sm font-semibold text-slate-800">
          Category Progress
        </h3>

        {budgets.map((budget) => {
          const data =
            getBudgetData(budget);

          const budgetAmount =
            Number(budget.amount || 0);

          const spent =
            Number(data?.spent || 0);

          const percentage =
            budgetAmount > 0
              ? Math.round(
                  (spent /
                    budgetAmount) *
                    100
                )
              : 0;

          const remaining =
            budgetAmount - spent;

          return (
            <div
              key={budget.id}
              className="rounded-xl border border-slate-100 p-4"
            >
              <div className="flex items-center justify-between gap-3">

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {budget.category}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    ₹
                    {spent.toLocaleString(
                      "en-IN"
                    )}{" "}
                    / ₹
                    {budgetAmount.toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>

                <span
                  className={`shrink-0 text-sm font-bold ${
                    percentage > 100
                      ? "text-red-600"
                      : percentage >= 80
                      ? "text-amber-600"
                      : "text-emerald-600"
                  }`}
                >
                  {percentage}%
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full transition-all ${
                    percentage > 100
                      ? "bg-red-500"
                      : percentage >= 80
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      percentage,
                      100
                    )}%`,
                  }}
                />
              </div>

              <p
                className={`mt-2 text-xs ${
                  remaining < 0
                    ? "font-semibold text-red-600"
                    : "text-slate-500"
                }`}
              >
                {remaining >= 0
                  ? `₹${remaining.toLocaleString(
                      "en-IN"
                    )} remaining`
                  : `₹${Math.abs(
                      remaining
                    ).toLocaleString(
                      "en-IN"
                    )} over budget`}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default BudgetOverview;