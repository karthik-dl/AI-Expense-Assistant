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
      name: profile.name || "",
      email: profile.email || "",
      phone: profile.phone || "",
      location: profile.location || "",
      bio: profile.bio || "",
    });
  }, [profile, reset]);

  const onSubmit = async (data) => {
    try {
      await updateProfile(data);

      toast.success("Profile updated successfully.");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
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
                message: "Invalid email address",
              },
            })}
          />

          <Input
            label="Phone"
            placeholder="Enter phone number"
            error={errors.phone?.message}
            {...register("phone")}
          />

          <Input
            label="Location"
            placeholder="Enter location"
            error={errors.location?.message}
            {...register("location")}
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Bio
          </label>

          <textarea
            rows={5}
            placeholder="Tell us about yourself..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            {...register("bio")}
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