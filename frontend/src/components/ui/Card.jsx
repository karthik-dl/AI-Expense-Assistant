import clsx from "clsx";

function Card({
  children,
  title,
  subtitle,
  headerAction,
  footer,
  className,
  padding = "p-5 sm:p-6",
  hover = false,
}) {
  return (
    <section
      className={clsx(
        "w-full min-w-0 overflow-hidden rounded-2xl",
        "border border-slate-200 bg-white",
        "shadow-sm",
        hover &&
          "transition-shadow duration-200 hover:shadow-md",
        padding,
        className
      )}
    >
      {(title || subtitle || headerAction) && (
        <div className="mb-5 flex min-w-0 items-start justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="min-w-0">
            {title && (
              <h3 className="truncate text-lg font-semibold text-slate-900">
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
            <div className="shrink-0">
              {headerAction}
            </div>
          )}
        </div>
      )}

      <div className="min-w-0">
        {children}
      </div>

      {footer && (
        <div className="mt-5 border-t border-slate-100 pt-4">
          {footer}
        </div>
      )}
    </section>
  );
}

export default Card;