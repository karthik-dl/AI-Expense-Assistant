import clsx from "clsx";

const sizes = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

function Avatar({
  src,
  name = "User",
  size = "md",
  status,
  className,
}) {
  return (
    <div className="relative inline-flex shrink-0">
      {src ? (
        <img
          src={src}
          alt={name}
          className={clsx(
            "rounded-full border border-slate-200 object-cover",
            sizes[size],
            className
          )}
        />
      ) : (
        <div
          className={clsx(
            "flex items-center justify-center rounded-full",
            "border border-blue-100 bg-blue-600",
            "font-semibold text-white",
            sizes[size],
            className
          )}
        >
          {getInitials(name) || "U"}
        </div>
      )}

      {status && (
        <span
          className={clsx(
            "absolute bottom-0 right-0 h-3 w-3 rounded-full",
            "border-2 border-white",
            {
              "bg-emerald-500": status === "online",
              "bg-amber-500": status === "away",
              "bg-red-500": status === "busy",
              "bg-slate-400": status === "offline",
            }
          )}
        />
      )}
    </div>
  );
}

export default Avatar;