import clsx from "clsx";
import { Loader2 } from "lucide-react";

const sizes = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-9 w-9",
  xl: "h-12 w-12",
};

function Loader({
  size = "md",
  text,
  fullScreen = false,
  className,
}) {
  const content = (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-3",
        className
      )}
    >
      <Loader2
        className={clsx(
          "animate-spin text-blue-600",
          sizes[size]
        )}
      />

      {text && (
        <p className="text-sm font-medium text-slate-500">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        {content}
      </div>
    );
  }

  return content;
}

export default Loader;