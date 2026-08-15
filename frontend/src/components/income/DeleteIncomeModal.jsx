import { useState } from "react";
import {
  AlertTriangle,
  Trash2,
} from "lucide-react";
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
    if (!income?.id) {
      console.error(
        "Delete Income: Missing income ID",
        income
      );

      toast.error("Income ID is missing.");
      return;
    }

    try {
      setLoading(true);

      console.log(
        "Deleting income:",
        income.id
      );

      const response =
        await incomeService.deleteIncome(
          income.id
        );

      console.log(
        "Delete Income Response:",
        response
      );

      toast.success(
        "Income deleted successfully."
      );

      await onSuccess?.();

      onClose?.();
    } catch (error) {
      console.error(
        "========== DELETE INCOME ERROR =========="
      );

      console.error(
        "Status:",
        error?.response?.status
      );

      console.error(
        "Response:",
        error?.response?.data
      );

      console.error(
        "URL:",
        error?.config?.url
      );

      console.error(
        "Method:",
        error?.config?.method
      );

      console.error(
        "Income ID:",
        income?.id
      );

      console.error(
        "Full Error:",
        error
      );

      console.error(
        "========================================="
      );

      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          "Failed to delete income."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!income) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Income"
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
                {income.source ||
                  "this income"}
              </span>
              .
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-6 text-slate-500">
          This action cannot be undone. The
          income record will be permanently
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
            disabled={loading}
            onClick={handleDelete}
            leftIcon={
              !loading ? (
                <Trash2 size={16} />
              ) : null
            }
            className="w-full sm:w-auto"
          >
            Delete Income
          </Button>

        </div>
      </div>
    </Modal>
  );
}

export default DeleteIncomeModal;