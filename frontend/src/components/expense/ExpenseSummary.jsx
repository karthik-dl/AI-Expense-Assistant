import {
  Receipt,
  CalendarDays,
  Calculator,
  List,
} from "lucide-react";

function ExpenseSummary({ expenses = [] }) {
  const totalExpense = expenses.reduce(
    (sum, expense) =>
      sum + Number(expense.amount || 0),
    0
  );

  const now = new Date();

  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const thisMonthExpense = expenses
    .filter((expense) => {
      const date = new Date(expense.date);

      return (
        date.getMonth() === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce(
      (sum, expense) =>
        sum + Number(expense.amount || 0),
      0
    );

  const averageExpense =
    expenses.length > 0
      ? totalExpense / expenses.length
      : 0;

  const cards = [
    {
      title: "Total Expenses",
      value: totalExpense,
      icon: Receipt,
      iconClass: "bg-red-50 text-red-600",
      valueClass: "text-red-600",
      prefix: "₹",
    },
    {
      title: "This Month",
      value: thisMonthExpense,
      icon: CalendarDays,
      iconClass: "bg-blue-50 text-blue-600",
      valueClass: "text-blue-600",
      prefix: "₹",
    },
    {
      title: "Average Expense",
      value: averageExpense,
      icon: Calculator,
      iconClass:
        "bg-emerald-50 text-emerald-600",
      valueClass: "text-emerald-600",
      prefix: "₹",
      decimals: 2,
    },
    {
      title: "Transactions",
      value: expenses.length,
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
              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <p
                  className={`mt-2 truncate text-2xl font-bold tracking-tight ${card.valueClass}`}
                  title={`${card.prefix}${card.value}`}
                >
                  {card.prefix}

                  {card.decimals
                    ? card.value.toFixed(2)
                    : card.value.toLocaleString(
                        "en-IN"
                      )}
                </p>
              </div>

              {/* Icon */}
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

export default ExpenseSummary;