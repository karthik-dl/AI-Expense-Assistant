function ConfirmDialog({
  open,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">
            {title}
          </h2>
        </div>

        <div className="px-6 py-5">
          <p className="text-gray-600">
            {message}
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border px-5 py-2 hover:bg-gray-100"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : confirmText}
          </button>
        </div>

      </div>
    </div>
  );
}

export default ConfirmDialog;