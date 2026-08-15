import { NavLink } from "react-router-dom";
import clsx from "clsx";

function NavItem({
  to,
  icon: Icon,
  label,
  badge,
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          "group flex min-h-10 items-center gap-3 rounded-xl px-3 py-2.5",
          "transition-colors duration-150",
          isActive
            ? "bg-blue-50 text-blue-700"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={19}
            strokeWidth={isActive ? 2.2 : 2}
            className={clsx(
              "shrink-0",
              isActive
                ? "text-blue-600"
                : "text-slate-400 group-hover:text-slate-600"
            )}
          />

          <span className="min-w-0 flex-1 truncate text-sm font-medium">
            {label}
          </span>

          {badge && (
            <span
              className={clsx(
                "rounded-full px-2 py-0.5 text-[10px] font-bold",
                isActive
                  ? "bg-blue-600 text-white"
                  : "bg-emerald-50 text-emerald-700"
              )}
            >
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

export default NavItem;