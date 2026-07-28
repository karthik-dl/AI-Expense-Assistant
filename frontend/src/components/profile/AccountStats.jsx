import {
  Wallet,
  TrendingUp,
  Target,
  Receipt,
} from "lucide-react";

import Card from "../ui/Card";

function StatItem({ title, value, icon, color }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:shadow-md">
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${color}`}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-500">
          {title}
        </p>

        <h3 className="text-2xl font-bold text-slate-800">
          {value}
        </h3>
      </div>
    </div>
  );
}

function AccountStats({ profile }) {
  const stats = profile.stats || {};

  return (
    <Card>
      <h2 className="mb-6 text-xl font-semibold text-slate-800">
        Account Statistics
      </h2>

      <div className="space-y-4">
        <StatItem
          title="Total Expenses"
          value={stats.expenses || 0}
          color="bg-red-100"
          icon={
            <Wallet
              className="text-red-600"
              size={24}
            />
          }
        />

        <StatItem
          title="Total Income"
          value={stats.income || 0}
          color="bg-green-100"
          icon={
            <TrendingUp
              className="text-green-600"
              size={24}
            />
          }
        />

        <StatItem
          title="Active Budgets"
          value={stats.budgets || 0}
          color="bg-blue-100"
          icon={
            <Target
              className="text-blue-600"
              size={24}
            />
          }
        />

        <StatItem
          title="Transactions"
          value={stats.transactions || 0}
          color="bg-purple-100"
          icon={
            <Receipt
              className="text-purple-600"
              size={24}
            />
          }
        />
      </div>
    </Card>
  );
}

export default AccountStats;