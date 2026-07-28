import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";

function NavItem({
  to,
  icon: Icon,
  label,
  badge,
  collapsed = false,
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          "group flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200",
          isActive
            ? "bg-blue-600 text-white shadow-lg"
            : "text-slate-300 hover:bg-slate-800 hover:text-white"
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={20}
            className={clsx(
              "flex-shrink-0",
              isActive ? "text-white" : "text-slate-400 group-hover:text-white"
            )}
          />

          {!collapsed && (
            <>
              <span className="flex-1 text-sm font-medium">
                {label}
              </span>

              {badge && (
                <span
                  className={clsx(
                    "rounded-full px-2 py-0.5 text-xs font-semibold",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-slate-700 text-slate-200"
                  )}
                >
                  {badge}
                </span>
              )}

              {!badge && (
                <ChevronRight
                  size={16}
                  className={clsx(
                    "transition-transform duration-200",
                    isActive
                      ? "translate-x-1 text-white"
                      : "text-slate-500 group-hover:translate-x-1 group-hover:text-slate-300"
                  )}
                />
              )}
            </>
          )}
        </>
      )}
    </NavLink>
  );
}

export default NavItem;