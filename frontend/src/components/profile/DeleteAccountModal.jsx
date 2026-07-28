import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

import { deleteAccount } from "../../services/profileService";

function DeleteAccountModal({ open, onClose }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async ({ password }) => {
    try {
      await deleteAccount(password);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.success("Account deleted successfully.");

      reset();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete account.");
    }
  };

  return (
    <Modal
      isOpen={open}
      onClose={() => {
        reset();
        onClose();
      }}
      title="Delete Account"
    >
      <div className="space-y-6">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <h3 className="mb-2 text-lg font-semibold text-red-700">
            Warning
          </h3>

          <p className="text-sm leading-6 text-red-600">
            This action is permanent.
            <br />
            Your profile, expenses, income, budgets and reports
            will be deleted permanently.
            <br />
            This action cannot be undone.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
            })}
          />

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                reset();
                onClose();
              }}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isSubmitting
                ? "Deleting..."
                : "Delete Account"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default DeleteAccountModal;