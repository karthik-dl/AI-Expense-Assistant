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
    console.log("DELETE CLICKED");
    console.log("BUDGET:", budget);

    if (!budget?.id) {
      toast.error("Budget ID is missing.");
      return;
    }

    try {
      setLoading(true);

      console.log(
        "Deleting budget ID:",
        budget.id
      );

      const response =
        await budgetService.deleteBudget(
          budget.id
        );

      console.log(
        "Delete response:",
        response?.data
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

      console.error(
        "Server Response:",
        error?.response?.data
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

  return (
    <Modal
      isOpen={open}
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
              You are about to delete{" "}
              <span className="font-semibold">
                {budget.category}
              </span>{" "}
              budget.
            </p>

          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-6 text-slate-500">
          This action cannot be undone.
          The budget will be permanently
          removed from your account.
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