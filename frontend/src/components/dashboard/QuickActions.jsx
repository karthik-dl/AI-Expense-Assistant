import { Link } from "react-router-dom";
import {
  PlusCircle,
  Wallet,
  ChartColumn,
  Bot,
} from "lucide-react";

import Card from "../ui/Card";

const actions = [
  {
    title: "Add Expense",
    description: "Record a new expense",
    icon: PlusCircle,
    to: "/expenses/new",
    iconClass: "bg-red-50 text-red-600",
  },
  {
    title: "Add Income",
    description: "Record new income",
    icon: Wallet,
    to: "/income/new",
    iconClass: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "View Reports",
    description: "Monthly analytics",
    icon: ChartColumn,
    to: "/reports",
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    title: "AI Summary",
    description: "Smart financial insights",
    icon: Bot,
    to: "/ai-summary",
    iconClass: "bg-indigo-50 text-indigo-600",
  },
];

function QuickActions() {
  return (
    <Card hover={false}>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Manage your finances quickly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.to}
              className="group flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 p-3 transition-colors hover:border-blue-200 hover:bg-blue-50/50"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${action.iconClass}`}
              >
                <Icon size={20} />
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-slate-900 group-hover:text-blue-600">
                  {action.title}
                </h3>

                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}

export default QuickActions;