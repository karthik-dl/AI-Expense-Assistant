import {
  LayoutDashboard,
  Receipt,
  Wallet,
  PiggyBank,
  ChartColumn,
  Bot,
  User,
  Settings,
  LogOut,
  X,
} from "lucide-react";

import clsx from "clsx";
import { useAuth } from "../../context/AuthContext";

import Logo from "./Logo";
import NavItem from "./NavItem";

function Sidebar({
  mobileOpen = false,
  onClose,
}) {
  const { user, logout } = useAuth();

  const navigation = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Expenses",
      to: "/expenses",
      icon: Receipt,
    },
    {
      label: "Income",
      to: "/income",
      icon: Wallet,
    },
    {
      label: "Budgets",
      to: "/budgets",
      icon: PiggyBank,
    },
    {
      label: "Reports",
      to: "/reports",
      icon: ChartColumn,
    },
    {
      label: "AI Summary",
      to: "/ai-summary",
      icon: Bot,
      badge: "AI",
    },
  ];

  const accountNavigation = [
    {
      label: "Profile",
      to: "/profile",
      icon: User,
    },
    {
      label: "Settings",
      to: "/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/30 lg:hidden"
        />
      )}

      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col",
          "border-r border-slate-200 bg-white",
          "transition-transform duration-200 ease-out",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center border-b border-slate-100 px-5">
          <div className="flex w-full items-center justify-between">
            <Logo />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          <nav className="space-y-1">
            {navigation.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                badge={item.badge}
              />
            ))}
          </nav>

          <p className="mb-2 mt-7 px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Account
          </p>

          <nav className="space-y-1">
            {accountNavigation.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </nav>
        </div>

        {/* User section */}
        <div className="shrink-0 border-t border-slate-100 p-4">
          <div className="rounded-xl bg-slate-50 p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-900">
                  {user?.name || "User"}
                </p>

                <p className="truncate text-xs text-slate-500">
                  {user?.email || ""}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={logout}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-red-100 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;