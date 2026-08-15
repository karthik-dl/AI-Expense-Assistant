import { CalendarDays } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function WelcomeHeader() {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex min-w-0 flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <h1 className="break-word text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Welcome back, {user?.name || "User"} 👋
          </h1>

          <p className="mt-1 text-sm text-slate-500 sm:text-base">
            Here's an overview of your financial activity.
          </p>
        </div>

        <div className="flex w-fit max-w-full items-center gap-2 rounded-xl bg-blue-50 px-3 py-2.5 text-sm font-medium text-blue-700">
          <CalendarDays
            size={18}
            className="shrink-0"
          />

          <span className="whitespace-nowrap">
            {today}
          </span>
        </div>
      </div>
    </section>
  );
}

export default WelcomeHeader;