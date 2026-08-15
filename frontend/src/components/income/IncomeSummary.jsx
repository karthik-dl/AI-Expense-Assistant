import {
  Wallet,
  CalendarDays,
  Calculator,
  List,
} from "lucide-react";

function IncomeSummary({
  incomes = [],
}) {
  const getIncomeDate = (income) =>
    income?.income_date ||
    income?.date ||
    "";

  const totalIncome = incomes.reduce(
    (sum, income) =>
      sum + Number(income?.amount || 0),
    0
  );

  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const thisMonthIncome = incomes
    .filter((income) => {
      const date = new Date(
        getIncomeDate(income)
      );

      return (
        !Number.isNaN(date.getTime()) &&
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce(
      (sum, income) =>
        sum + Number(income?.amount || 0),
      0
    );

  const averageIncome =
    incomes.length > 0
      ? totalIncome / incomes.length
      : 0;

  const cards = [
    {
      title: "Total Income",
      value: totalIncome,
      icon: Wallet,
      iconClass:
        "bg-emerald-50 text-emerald-600",
      valueClass: "text-emerald-600",
      prefix: "₹",
    },
    {
      title: "This Month",
      value: thisMonthIncome,
      icon: CalendarDays,
      iconClass:
        "bg-blue-50 text-blue-600",
      valueClass: "text-blue-600",
      prefix: "₹",
    },
    {
      title: "Average Income",
      value: averageIncome,
      icon: Calculator,
      iconClass:
        "bg-indigo-50 text-indigo-600",
      valueClass: "text-indigo-600",
      prefix: "₹",
      decimal: true,
    },
    {
      title: "Transactions",
      value: incomes.length,
      icon: List,
      iconClass:
        "bg-slate-100 text-slate-600",
      valueClass: "text-slate-900",
      prefix: "",
    },
  ];

  return (
    <section className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <p
                  className={`mt-2 truncate text-2xl font-bold tracking-tight ${card.valueClass}`}
                >
                  {card.prefix}

                  {card.decimal
                    ? card.value.toFixed(2)
                    : card.value.toLocaleString(
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
    </section>
  );
}

export default IncomeSummary;