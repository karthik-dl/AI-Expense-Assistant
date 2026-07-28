import clsx from "clsx";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",

  secondary:
    "bg-slate-100 text-slate-800 hover:bg-slate-200 focus:ring-slate-400",

  success:
    "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",

  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",

  outline:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-300",

  ghost:
    "text-slate-700 hover:bg-slate-100 focus:ring-slate-300",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className,
  leftIcon,
  rightIcon,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}

      {!loading && leftIcon}

      <span>{children}</span>

      {!loading && rightIcon}
    </button>
  );
}

export default Button;