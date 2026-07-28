import { useState } from "react";
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
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import clsx from "clsx";
import Logo from "./Logo";
import NavItem from "./NavItem";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-xl bg-slate-900 p-2 text-white lg:hidden"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <aside
        className={clsx(
          "fixed left-0 top-0 z-50 flex h-screen flex-col bg-slate-900 transition-all duration-300",
          collapsed ? "w-24" : "w-72",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <Logo collapsed={collapsed} />

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden rounded-lg p-2 text-slate-300 hover:bg-slate-800 lg:block"
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <ChevronLeft size={18} />
            )}
          </button>

          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1 space-y-2 px-4">
          {navigation.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              badge={item.badge}
              collapsed={collapsed}
            />
          ))}
        </nav>

        {/* Bottom */}
        <div className="border-t border-slate-800 p-4">
          <NavItem
            to="/profile"
            icon={User}
            label="Profile"
            collapsed={collapsed}
          />

          <NavItem
            to="/settings"
            icon={Settings}
            label="Settings"
            collapsed={collapsed}
          />

          <div
            className={clsx(
              "mt-6 rounded-2xl bg-slate-800 p-4",
              collapsed && "p-2"
            )}
          >
            {!collapsed && (
              <>
                <div className="mb-4 flex items-center gap-3">
                  <Avatar
                    name="Karthik D L"
                    status="online"
                  />

                  <div>
                    <h4 className="font-medium text-white">
                      Karthik D L
                    </h4>

                    <p className="text-xs text-slate-400">
                      Python Developer
                    </p>
                  </div>
                </div>

                <Button
                  variant="danger"
                  className="w-full"
                  leftIcon={<LogOut size={18} />}
                >
                  Logout
                </Button>
              </>
            )}

            {collapsed && (
              <div className="flex justify-center">
                <Avatar
                  name="Karthik D L"
                  status="online"
                />
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;