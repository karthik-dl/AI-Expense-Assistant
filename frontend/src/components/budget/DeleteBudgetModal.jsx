import { useState } from "react";
import {
  AlertTriangle,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

import * as budgetService from "../../services/budgetService";

function DeleteBudgetModal({
  open,
  onClose,
  budget,
  onSuccess,
}) {
  const [loading, setLoading] =
    useState(false);

  const handleDelete = async () => {
    if (!budget?.id) {
      toast.error("Invalid budget.");
      return;
    }

    try {
      setLoading(true);

      await budgetService.deleteBudget(
        budget.id
      );

      toast.success(
        "Budget deleted successfully."
      );

      await onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error(
        "Delete Budget Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete budget."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!budget) {
    return null;
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month =
    Number(budget.month) >= 1 &&
    Number(budget.month) <= 12
      ? monthNames[
          Number(budget.month) - 1
        ]
      : "";

  return (
    <Modal
      open={open}
      onClose={
        loading ? undefined : onClose
      }
      title="Delete Budget"
      size="sm"
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
              You are about to delete the{" "}
              <span className="font-semibold">
                {budget.category ||
                  "budget"}
              </span>{" "}
              budget
              {month
                ? ` for ${month} ${budget.year || ""}`
                : ""}
              .
            </p>
          </div>
        </div>

        {/* Amount */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-slate-500">
              Budget Amount
            </span>

            <span className="text-base font-bold text-slate-900">
              ₹
              {Number(
                budget.amount || 0
              ).toLocaleString(
                "en-IN"
              )}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-6 text-slate-500">
          This action cannot be undone. The
          budget will be permanently removed
          from your account.
        </p>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
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
            disabled={loading}
            onClick={handleDelete}
            leftIcon={
              !loading && (
                <Trash2 size={16} />
              )
            }
            className="w-full sm:w-auto"
          >
            Delete Budget
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteBudgetModal;