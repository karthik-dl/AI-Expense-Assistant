import { useState } from "react";
import toast from "react-hot-toast";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

import * as incomeService from "../../services/incomeService";

function DeleteIncomeModal({
  open,
  onClose,
  income,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      await incomeService.deleteIncome(income.id);

      toast.success("Income deleted successfully.");

      onSuccess();
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete income."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!income) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Income"
    >
      <div className="space-y-6">
        <p className="text-slate-600">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            {income.title}
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

export default DeleteIncomeModal;