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
  const [loading, setLoading] = useState(false);

  if (!budget) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteBudget(budget.id);

      toast.success("Budget deleted successfully.");

      onClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);

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
        <p className="text-slate-600">
          Are you sure you want to delete the budget for{" "}
          <strong>{budget.category}</strong>?
        </p>

        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading
              ? "Deleting..."
              : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteBudgetModal;