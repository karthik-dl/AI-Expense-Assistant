import WelcomeHeader from "../../components/dashboard/WelcomeHeader";
import FinancialOverview from "../../components/dashboard/FinancialOverview";
import ExpensePieChart from "../../components/dashboard/ExpensePieChart";
import MonthlyTrendChart from "../../components/dashboard/MonthlyTrendChart";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import QuickActions from "../../components/dashboard/QuickActions";
import BudgetOverview from "../../components/dashboard/BudgetOverview";

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-[1600px] min-w-0 space-y-5 sm:space-y-6">
  
      <WelcomeHeader />

      <FinancialOverview />

      <section className="min-w-0">
        <BudgetOverview />
      </section>

      <section className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-2">
    
        <div className="min-w-0">
          <ExpensePieChart />
        </div>

        <div className="min-w-0">
          <MonthlyTrendChart />
        </div>
      </section>

      <section className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-3">
       
        <div className="min-w-0 xl:col-span-2">
          <RecentTransactions />
        </div>

        <div className="min-w-0">
          <QuickActions />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;