import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Modal from "../ui/Modal";
import Input from "../ui/Input";
import Button from "../ui/Button";

import { changePassword } from "../../services/profileService";

function ChangePasswordModal({ open, onClose }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const newPassword = watch(
    "newPassword"
  );

  const onSubmit = async (data) => {
    try {
      await changePassword({
        currentPassword:
          data.currentPassword,

        newPassword:
          data.newPassword,

        confirmPassword:
          data.confirmPassword,
      });

      toast.success(
        "Password changed successfully."
      );

      reset();

      onClose();
    } catch (error) {
      console.error(
        "Change Password Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to change password."
      );
    }
  };

  return (
    <Modal
      isOpen={open}
      onClose={() => {
        reset();
        onClose();
      }}
      title="Change Password"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <Input
          label="Current Password"
          type="password"
          placeholder="Enter current password"
          error={
            errors.currentPassword?.message
          }
          {...register(
            "currentPassword",
            {
              required:
                "Current password is required",
            }
          )}
        />

        <Input
          label="New Password"
          type="password"
          placeholder="Enter new password"
          error={
            errors.newPassword?.message
          }
          {...register("newPassword", {
            required:
              "New password is required",
            minLength: {
              value: 8,
              message:
                "Password must be at least 8 characters",
            },
          })}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm new password"
          error={
            errors.confirmPassword?.message
          }
          {...register(
            "confirmPassword",
            {
              required:
                "Please confirm your password",
              validate: (value) =>
                value === newPassword ||
                "Passwords do not match",
            }
          )}
        />

        <div className="flex justify-end gap-3 pt-2">
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
          >
            {isSubmitting
              ? "Updating..."
              : "Update Password"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default ChangePasswordModal;