import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";

import { updateProfile } from "../../services/profileService";

function ProfileForm({ profile, onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    reset({
      name: profile?.name || "",
      email: profile?.email || "",
    });
  }, [profile, reset]);

  const onSubmit = async (data) => {
    try {
      await updateProfile({
        name: data.name.trim(),
        email: data.email.trim(),
      });

      toast.success(
        "Profile updated successfully."
      );

      if (onSuccess) {
        await onSuccess();
      }
    } catch (error) {
      console.error(
        "Profile Update Error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to update profile."
      );
    }
  };

  return (
    <Card>
      <h2 className="mb-6 text-2xl font-semibold text-slate-800">
        Edit Profile
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            label="Full Name"
            placeholder="Enter your name"
            error={errors.name?.message}
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message:
                  "Name must be at least 2 characters",
              },
            })}
          />

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value:
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message:
                  "Invalid email address",
              },
            })}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : "Save Changes"}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default ProfileForm;