import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";

function BudgetSummary({
  budgets = [],
  remainingData = [],
}) {
  const totalBudget = budgets.reduce(
    (sum, budget) =>
      sum + Number(budget.amount || 0),
    0
  );

  const totalSpent = budgets.reduce(
    (sum, budget) => {
      const data = remainingData.find(
        (item) =>
          item.category ===
          budget.category
      );

      return (
        sum + Number(data?.spent || 0)
      );
    },
    0
  );

  const totalRemaining =
    totalBudget - totalSpent;

  const utilization =
    totalBudget > 0
      ? (totalSpent / totalBudget) * 100
      : 0;

  const overBudget =
    totalRemaining < 0;

  const cards = [
    {
      title: "Total Budget",
      value: totalBudget,
      icon: Wallet,
      iconClass:
        "bg-blue-50 text-blue-600",
      valueClass:
        "text-slate-900",
    },
    {
      title: "Total Spent",
      value: totalSpent,
      icon: TrendingDown,
      iconClass:
        "bg-red-50 text-red-600",
      valueClass:
        "text-red-600",
    },
    {
      title: overBudget
        ? "Over Budget"
        : "Remaining",
      value: Math.abs(totalRemaining),
      icon: overBudget
        ? TrendingDown
        : TrendingUp,
      iconClass: overBudget
        ? "bg-red-50 text-red-600"
        : "bg-emerald-50 text-emerald-600",
      valueClass: overBudget
        ? "text-red-600"
        : "text-emerald-600",
    },
    {
      title: "Utilization",
      value: utilization,
      icon: PiggyBank,
      iconClass:
        "bg-purple-50 text-purple-600",
      valueClass:
        utilization > 100
          ? "text-red-600"
          : "text-purple-600",
      percentage: true,
    },
  ];

  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <p
                  className={`mt-2 break-word text-2xl font-bold ${card.valueClass}`}
                >
                  {card.percentage
                    ? `${card.value.toFixed(
                        1
                      )}%`
                    : `₹${card.value.toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        }
                      )}`}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.iconClass}`}
              >
                <Icon size={20} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default BudgetSummary;