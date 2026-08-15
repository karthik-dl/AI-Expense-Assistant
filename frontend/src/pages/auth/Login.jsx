import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Mail,
  Lock,
  ArrowRight,
  Wallet,
} from "lucide-react";
import toast from "react-hot-toast";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

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

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4 py-8">

     <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl shadow-black/40">

  {/* Ledger stamp */}
  <div className="pointer-events-none absolute -right-7 top-4 rotate-90 font-mono text-[10px] tracking-[0.2em] text-line">
    AUG 04
  </div>

  <div className="flex flex-col justify-center p-10">

          {/* Logo */}

          <div className="mb-8 text-center">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sage shadow-md">
              <Wallet
                size={30}
                className="text-ink"
              />
            </div>

            <h1 className="mt-5 font-display text-3xl font-semibold text-bone">
              ExpenseAI
            </h1>

            <p className="mt-2 text-sm text-muted">
              Smart Personal Finance Manager
            </p>

          </div>

          {/* Heading */}

          <div className="mb-8 text-center">

            <h2 className="font-display text-2xl font-semibold text-bone">
              Welcome Back 👋
            </h2>

            <p className="mt-2 text-sm text-muted">
              Sign in to continue
            </p>

          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            <Input
              label="Email Address"
              type="email"
              leftIcon={<Mail size={16} />}
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
              })}
            />

            <Input
              label="Password"
              type="password"
              leftIcon={<Lock size={16} />}
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
              })}
            />

            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2 text-muted">

                <input
                  type="checkbox"
                  className="rounded border-line accent-sage"
                />

                Remember me

              </label>

              <Link
                to="/forgot-password"
                className="font-medium text-sage hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              rightIcon={<ArrowRight size={16} />}
            >
              Sign In
            </Button>

          </form>

          {/* Footer */}

          <div className="mt-8 border-t border-line pt-6 text-center">

            <p className="text-sm text-muted">
              Don't have an account?
            </p>

            <Link
              to="/register"
              className="mt-2 inline-block font-semibold text-sage hover:text-gold hover:underline"
            >
              Create Account
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;