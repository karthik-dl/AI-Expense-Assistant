import { useLocation } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/expenses": "Expenses",
  "/income": "Income",
  "/budgets": "Budgets",
  "/analytics": "Analytics",
  "/reports": "Reports",
  "/ai-summary": "AI Financial Summary",
  "/profile": "Profile",
};

function Navbar() {
  const location = useLocation();
  const { user } = useAuth();

  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200 h-20 px-8 flex items-center justify-between">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Welcome back! Manage your finances efficiently.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        <div className="flex items-center gap-3 cursor-pointer rounded-xl px-3 py-2 hover:bg-slate-100 transition">

          <img
            src={`https://ui-avatars.com/api/?name=${
              user?.name || "User"
            }&background=2563eb&color=fff`}
            alt="Profile"
            className="w-11 h-11 rounded-full"
          />

          <div className="hidden md:block">

            <h3 className="text-sm font-semibold text-slate-800">
              {user?.name || "Karthik D L"}
            </h3>

            <p className="text-xs text-slate-500">
              Personal Account
            </p>

          </div>

          <FaChevronDown className="text-xs text-slate-500" />

        </div>

      </div>

    </header>
  );
}

export default Navbar;