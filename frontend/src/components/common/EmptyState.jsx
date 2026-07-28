import { Inbox } from "lucide-react";
import Button from "../ui/Button";

function EmptyState({
  icon: Icon = Inbox,
  title = "No Data Found",
  description = "There's nothing to display right now.",
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-16 text-center">
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
        <Icon
          size={40}
          className="text-slate-500"
        />
      </div>

      <h2 className="text-xl font-semibold text-slate-900">
        {title}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>

      {actionLabel && (
        <div className="mt-8">
          <Button onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

export default EmptyState;