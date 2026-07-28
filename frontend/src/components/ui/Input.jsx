import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      type = "text",
      className,
      required = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-slate-700">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={
              isPassword
                ? showPassword
                  ? "text"
                  : "password"
                : type
            }
            disabled={disabled}
            className={clsx(
              "h-11 w-full rounded-xl border bg-white px-4 text-sm text-slate-700 outline-none transition-all duration-200",
              leftIcon && "pl-10",
              (rightIcon || isPassword) && "pr-10",
              error
                ? "border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
              disabled && "cursor-not-allowed bg-slate-100 opacity-70",
              className
            )}
            {...props}
          />

          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          ) : (
            rightIcon && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                {rightIcon}
              </div>
            )
          )}
        </div>

        {error ? (
          <p className="mt-1 text-sm text-red-500">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-sm text-slate-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;