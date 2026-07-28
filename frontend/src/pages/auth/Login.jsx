import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import AuthLayout from "../../components/auth/AuthLayout";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);

      login(response.user, response.access_token);

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid email or password"
      );
    }
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Login to continue to your account"
      footerText="Don't have an account?"
      footerLabel="Sign Up"
      footerLink="/register"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">

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
              })}
              className="w-full h-12 rounded-lg border border-slate-200 bg-white px-4 pr-12 text-sm placeholder:text-slate-400 outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? (
                <FaEyeSlash size={18} />
              ) : (
                <FaEye size={18} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between pt-2 text-sm">
          <label className="flex items-center gap-2 text-slate-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="font-medium text-blue-600 hover:text-blue-700"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full h-12 rounded-lg bg-blue-600 font-semibold text-white shadow-md transition duration-200 hover:bg-blue-700 disabled:opacity-60"
        >
          {isSubmitting ? "Signing In..." : "Login"}
        </button>

      </form>
    </AuthLayout>
  );
}

export default Login;