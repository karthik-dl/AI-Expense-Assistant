import { useState } from "react";
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
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await expenseService.deleteExpense(expense.id);

      toast.success("Expense deleted successfully.");

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete expense."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!expense) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Expense"
    >
      <div className="space-y-6">
        <p className="text-slate-600">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            {expense.title}
          </span>
          ?
        </p>

        <p className="text-sm text-red-600">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="danger"
            loading={loading}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteExpenseModal;