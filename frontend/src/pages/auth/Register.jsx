import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import AuthLayout from "../../components/auth/AuthLayout";
import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Create your account to start managing your finances."
      footerText="Already have an account?"
      footerLabel="Login"
      footerLink="/login"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

        {/* Full Name */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your full name"
            {...register("name", {
              required: "Full name is required",
            })}
            className="w-full h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm placeholder:text-slate-400 outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
              },
            })}
            className="w-full h-12 rounded-lg border border-slate-200 bg-white px-4 text-sm placeholder:text-slate-400 outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {errors.email && (
            <p className="text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full h-12 rounded-lg border border-slate-200 bg-white px-4 pr-12 text-sm placeholder:text-slate-400 outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800">
            Confirm Password
          </label>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="w-full h-12 rounded-lg border border-slate-200 bg-white px-4 pr-12 text-sm placeholder:text-slate-400 outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showConfirmPassword ? (
                <FaEyeSlash size={18} />
              ) : (
                <FaEye size={18} />
              )}
            </button>
          </div>

          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full h-12 rounded-lg bg-blue-600 font-semibold text-white shadow-md transition duration-200 hover:bg-blue-700 disabled:opacity-60"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>

      </form>
    </AuthLayout>
  );
}

export default Register;