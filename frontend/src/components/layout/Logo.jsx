import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link
      to="/dashboard"
      className="group flex min-w-0 items-center gap-3"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition-colors group-hover:bg-blue-700">
        <Wallet size={21} strokeWidth={2.2} />
      </div>

      <div className="min-w-0">
        <h1 className="truncate text-lg font-bold tracking-tight text-slate-900">
          ExpenseAI
        </h1>

        <p className="truncate text-xs font-medium text-slate-500">
          Personal Finance
        </p>
      </div>
    </Link>
  );
}

export default Logo;