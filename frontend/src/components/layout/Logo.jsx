import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";

function Logo({ collapsed = false }) {
  return (
    <Link
      to="/dashboard"
      className="flex items-center gap-3"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-lg">
        <Wallet
          size={24}
          className="text-white"
        />
      </div>

      {!collapsed && (
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white">
            ExpenseAI
          </h2>

          <p className="text-xs text-slate-400">
            Finance Assistant
          </p>
        </div>
      )}
    </Link>
  );
}

export default Logo;