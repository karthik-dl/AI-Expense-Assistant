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
    color: "bg-red-100 text-red-600",
  },
  {
    title: "Add Income",
    description: "Record new income",
    icon: Wallet,
    to: "/income/new",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "View Reports",
    description: "Monthly analytics",
    icon: ChartColumn,
    to: "/reports",
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "AI Summary",
    description: "Smart financial insights",
    icon: Bot,
    to: "/ai-summary",
    color: "bg-purple-100 text-purple-600",
  },
];

function QuickActions() {
  return (
    <Card>
      <h2 className="mb-6 text-xl font-bold">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.to}
              className="group flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition-all duration-300 hover:border-blue-500 hover:bg-blue-50"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${action.color}`}
              >
                <Icon size={26} />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-600">
                  {action.title}
                </h3>

                <p className="text-sm text-slate-500">
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