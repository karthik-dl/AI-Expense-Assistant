import {
  Wallet,
  Receipt,
  PiggyBank,
  Layers3,
} from "lucide-react";

function BudgetSummary({
  budgets = [],
}) {
  const totalBudget =
    budgets.reduce(
      (sum, budget) =>
        sum +
        Number(
          budget?.amount || 0
        ),
      0
    );

  const totalSpent =
    budgets.reduce(
      (sum, budget) =>
        sum +
        Number(
          budget?.spent || 0
        ),
      0
    );

  const remaining =
    totalBudget - totalSpent;

  const cards = [
    {
      title: "Total Budget",
      value: totalBudget,
      prefix: "₹",
      icon: Wallet,
      iconClass:
        "bg-blue-50 text-blue-600",
      valueClass:
        "text-blue-600",
    },
    {
      title: "Total Spent",
      value: totalSpent,
      prefix: "₹",
      icon: Receipt,
      iconClass:
        "bg-red-50 text-red-600",
      valueClass:
        "text-red-600",
    },
    {
      title: "Remaining",
      value: remaining,
      prefix: "₹",
      icon: PiggyBank,
      iconClass:
        remaining >= 0
          ? "bg-emerald-50 text-emerald-600"
          : "bg-red-50 text-red-600",
      valueClass:
        remaining >= 0
          ? "text-emerald-600"
          : "text-red-600",
    },
    {
      title: "Categories",
      value: budgets.length,
      prefix: "",
      icon: Layers3,
      iconClass:
        "bg-slate-100 text-slate-600",
      valueClass:
        "text-slate-900",
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
                  {card.prefix}
                  {Number(
                    card.value || 0
                  ).toLocaleString(
                    "en-IN"
                  )}
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