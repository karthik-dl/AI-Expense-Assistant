import WelcomeHeader from "../../components/dashboard/WelcomeHeader";
import FinancialOverview from "../../components/dashboard/FinancialOverview";
import ExpensePieChart from "../../components/dashboard/ExpensePieChart";
import MonthlyTrendChart from "../../components/dashboard/MonthlyTrendChart";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import QuickActions from "../../components/dashboard/QuickActions";

function Dashboard() {
  return (
    <div className="space-y-8">
      <WelcomeHeader />

      <FinancialOverview />

      <div className="grid gap-8 lg:grid-cols-2">
        <ExpensePieChart />
        <MonthlyTrendChart />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentTransactions />
        </div>

        <QuickActions />
      </div>
    </div>
  );
}

export default Dashboard;