import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

import { login as loginAPI } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const { data } = await loginAPI(formData);

      login(data.access_token, data.user);

      toast.success("Login successful!");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 text-white items-center justify-center p-16">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold leading-tight">
            AI Expense Assistant
          </h1>

          <p className="mt-6 text-lg text-blue-100">
            Manage your income, expenses,
            budgets and AI financial insights
            from one beautiful dashboard.
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-1 items-center justify-center bg-slate-50 px-6">
        <Card
          className="w-full max-w-md"
          hover={false}
        >
          <h2 className="text-3xl font-bold">
            Welcome Back 👋
          </h2>

          <p className="mt-2 text-slate-500">
            Login to continue.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >
            <Input
              label="Email"
              type="email"
              leftIcon={<Mail size={18} />}
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
              })}
            />

            <Input
              label="Password"
              type="password"
              leftIcon={<Lock size={18} />}
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
              })}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              rightIcon={<ArrowRight size={18} />}
            >
              Sign In
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600"
            >
              Create Account
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}

export default Login;