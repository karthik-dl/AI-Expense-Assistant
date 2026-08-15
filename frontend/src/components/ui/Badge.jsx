import clsx from "clsx";

const variants = {
  primary: "bg-blue-50 text-blue-700 ring-1 ring-blue-100",
  success: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  danger: "bg-red-50 text-red-700 ring-1 ring-red-100",
  warning: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  info: "bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100",
  purple: "bg-violet-50 text-violet-700 ring-1 ring-violet-100",
  gray: "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
  lg: "px-3 py-1.5 text-sm",
};

function Badge({
  children,
  variant = "primary",
  size = "md",
  rounded = true,
  className,
}) {
  return (
    <span
      className={clsx(
        "inline-flex max-w-full items-center justify-center font-medium",
        "whitespace-nowrap",
        rounded ? "rounded-full" : "rounded-lg",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;