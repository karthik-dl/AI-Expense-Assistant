import { useState } from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

import * as expenseService from "../../services/expenseService";

function DeleteExpenseModal({
  open,
  onClose,
  expense,
  onSuccess,
}) {
  const [loading, setLoading] =
    useState(false);

  const handleDelete = async () => {
    if (!expense?.id) return;

    try {
      setLoading(true);

      await expenseService.deleteExpense(
        expense.id
      );

      toast.success(
        "Expense deleted successfully."
      );

      await onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error(
        "Delete Expense Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete expense."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!expense) return null;

  return (
    <Modal
      isOpen={open}
      onClose={onClose}
      title="Delete Expense"
      size="sm"
      footer={
        <div className="flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="danger"
            loading={loading}
            onClick={handleDelete}
            leftIcon={
              !loading && <Trash2 size={16} />
            }
            className="w-full sm:w-auto"
          >
            Delete Expense
          </Button>
        </div>
      }
    >
      <div className="space-y-5">
        {/* Warning */}
        <div className="flex gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
            <AlertTriangle size={18} />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-red-800">
              Are you sure?
            </p>

            <p className="mt-1 text-sm leading-5 text-red-700">
              You are about to delete{" "}
              <span className="font-semibold">
                {expense.title ||
                  "this expense"}
              </span>
              .
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-6 text-slate-500">
          This action cannot be undone. The
          expense will be permanently removed
          from your account.
        </p>
      </div>
    </Modal>
  );
}

export default DeleteExpenseModal;