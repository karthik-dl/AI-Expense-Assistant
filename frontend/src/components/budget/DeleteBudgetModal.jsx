import { useState } from "react";
import toast from "react-hot-toast";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

import { deleteBudget } from "../../services/budgetService";

function DeleteBudgetModal({
  open,
  budget,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] =
    useState(false);

  if (!budget) {
    return null;
  }

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteBudget(
        budget.id
      );

      toast.success(
        "Budget deleted successfully."
      );

      onClose?.();

      await onSuccess?.();
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

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Budget"
    >
      <div className="space-y-6">
        <div className="rounded-xl border border-red-100 bg-red-50 p-4">
          <p className="text-sm leading-6 text-red-700">
            Are you sure you want to
            delete the budget for{" "}
            <strong>
              {budget.category}
            </strong>
            ?
          </p>
        </div>

        <p className="text-sm text-slate-500">
          This action cannot be undone.
          The budget record will be
          permanently removed.
        </p>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
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
            onClick={handleDelete}
            loading={loading}
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