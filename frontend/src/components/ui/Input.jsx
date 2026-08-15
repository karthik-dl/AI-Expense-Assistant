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
    const [showPassword, setShowPassword] =
      useState(false);

    const isPassword =
      type === "password";

    const inputType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : type;

    return (
      <div className="w-full min-w-0">
        {label && (
          <label className="mb-2 block text-sm font-medium text-slate-700">
            {label}

            {required && (
              <span className="ml-1 text-red-500">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative w-full">
          {/* Left Icon */}
          {leftIcon && (
            <div className="pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-400">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={clsx(
              "h-11 w-full min-w-0 rounded-xl border bg-white",
              "px-4 text-sm text-slate-900",
              "placeholder:text-slate-400",
              "outline-none transition-colors duration-200",

              leftIcon && "pl-11",

              (rightIcon || isPassword) &&
                "pr-11",

              error
                ? [
                    "border-red-400",
                    "focus:border-red-500",
                    "focus:ring-4",
                    "focus:ring-red-100",
                  ]
                : [
                    "border-slate-300",
                    "hover:border-slate-400",
                    "focus:border-blue-500",
                    "focus:ring-4",
                    "focus:ring-blue-100",
                  ],

              disabled && [
                "cursor-not-allowed",
                "bg-slate-100",
                "text-slate-500",
              ],

              className
            )}
            {...props}
          />

          {/* Password Toggle */}
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              disabled={disabled}
              onClick={() =>
                setShowPassword(
                  (previous) =>
                    !previous
                )
              }
              className="absolute right-3.5 top-1/2 z-10 -translate-y-1/2 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          )}

          {/* Right Icon */}
          {!isPassword &&
            rightIcon && (
              <div className="pointer-events-none absolute right-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-400">
                {rightIcon}
              </div>
            )}
        </div>

        {/* Error */}
        {error && (
          <p className="mt-1.5 text-xs font-medium text-red-600">
            {error}
          </p>
        )}

        {/* Helper */}
        {!error && helperText && (
          <p className="mt-1.5 text-xs text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;