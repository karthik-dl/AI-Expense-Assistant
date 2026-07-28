import clsx from "clsx";

const variants = {
  primary: "bg-blue-100 text-blue-700",
  success: "bg-emerald-100 text-emerald-700",
  danger: "bg-red-100 text-red-700",
  warning: "bg-amber-100 text-amber-700",
  info: "bg-cyan-100 text-cyan-700",
  purple: "bg-violet-100 text-violet-700",
  gray: "bg-slate-100 text-slate-700",
};

const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-sm",
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
        "inline-flex items-center justify-center font-medium",
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