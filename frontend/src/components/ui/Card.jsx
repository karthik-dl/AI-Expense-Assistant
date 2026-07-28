import clsx from "clsx";

function Card({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  className,
  padding = "p-6",
  hover = true,
}) {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-slate-200 bg-white transition-all duration-300",
        hover ? "hover:-translate-y-1 hover:shadow-lg" : "shadow-sm",
        padding,
        className
      )}
    >
      {(title || subtitle || headerAction) && (
        <div className="mb-6 flex items-start justify-between">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-slate-900">
                {title}
              </h3>
            )}

            {subtitle && (
              <p className="mt-1 text-sm text-slate-500">
                {subtitle}
              </p>
            )}
          </div>

          {headerAction && (
            <div>
              {headerAction}
            </div>
          )}
        </div>
      )}

      <div>
        {children}
      </div>

      {footer && (
        <div className="mt-6 border-t border-slate-100 pt-4">
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;