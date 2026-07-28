import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaWallet,
  FaMoneyBillWave,
  FaBullseye,
  FaChartBar,
  FaFileAlt,
  FaRobot,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const menu = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <FaChartPie />,
  },
  {
    title: "Expenses",
    path: "/expenses",
    icon: <FaWallet />,
  },
  {
    title: "Income",
    path: "/income",
    icon: <FaMoneyBillWave />,
  },
  {
    title: "Budgets",
    path: "/budgets",
    icon: <FaBullseye />,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <FaFileAlt />,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: <FaChartBar />,
  },
  {
    title: "AI Summary",
    path: "/ai-summary",
    icon: <FaRobot />,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <FaUser />,
  },
];

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#07152f] text-white flex flex-col shadow-2xl">

      {/* Logo */}
      <div className="px-6 py-7 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-wide flex items-center gap-2">
          💰 AI Expense
        </h1>

        <p className="text-xs text-slate-400 mt-1">
          Smart Finance Assistant
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">

        {menu.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="text-base">{item.icon}</span>

            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-white/10 p-4">

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-red-500 hover:text-white">
          <FaSignOutAlt />

          Logout
        </button>

      </div>
    </aside>
  );
}

export default Sidebar;