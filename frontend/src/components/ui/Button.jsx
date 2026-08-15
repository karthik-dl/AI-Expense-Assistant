import clsx from "clsx";
import { Loader2 } from "lucide-react";

const variants = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-200",

  secondary:
    "bg-slate-100 text-slate-800 hover:bg-slate-200 focus:ring-slate-200",

  success:
    "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-200",

  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-200",

  outline:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-200",

  ghost:
    "text-slate-700 hover:bg-slate-100 focus:ring-slate-200",
};

const sizes = {
  sm: "h-9 px-3.5 text-sm",
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
        "inline-flex w-auto items-center justify-center gap-2",
        "rounded-xl font-semibold",
        "transition-all duration-200",
        "focus:outline-none focus:ring-4",
        "disabled:cursor-not-allowed disabled:opacity-60",
        "active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {leftIcon}
          <span>{children}</span>
          {rightIcon}
        </>
      )}
    </button>
  );
}

export default Button;