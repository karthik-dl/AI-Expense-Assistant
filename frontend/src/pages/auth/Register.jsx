import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, ArrowRight, Wallet } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import { register as registerAPI } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      await registerAPI(payload);

      toast.success("Account created successfully!");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}

      <div className="relative hidden items-center justify-center overflow-hidden bg-linear-to-br from-ink via-surface to-[#1C4736] p-16 text-bone lg:flex lg:w-1/2">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sage/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

        <div className="relative max-w-lg">
          <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-bone/10 ring-1 ring-inset ring-bone/15 backdrop-blur">
            <Wallet size={26} />
          </div>

          <h1 className="font-display text-5xl font-semibold leading-tight tracking-tight">
            Join ExpenseAI
          </h1>

          <p className="mt-6 text-lg text-bone/70">
            Take control of your finances with
            smart expense tracking, budgeting,
            analytics and AI insights.
          </p>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex flex-1 items-center justify-center bg-ink px-6">
        <Card
          className="w-full max-w-md border border-line bg-surface"
          hover={false}
        >
          <h2 className="font-display text-3xl font-semibold tracking-tight text-bone">
            Create Account
          </h2>

          <p className="mt-2 text-muted">
            Start managing your finances today.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
          >
            <Input
              label="Full Name"
              leftIcon={<User size={18} />}
              error={errors.name?.message}
              {...register("name", {
                required: "Name is required",
              })}
            />

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
                minLength: {
                  value: 6,
                  message:
                    "Minimum 6 characters",
                },
              })}
            />

            <Input
              label="Confirm Password"
              type="password"
              leftIcon={<Lock size={18} />}
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required:
                  "Confirm your password",
                validate: (value) =>
                  value === password ||
                  "Passwords do not match",
              })}
            />

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              rightIcon={<ArrowRight size={18} />}
            >
              Create Account
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-sage transition-colors hover:text-gold hover:underline underline-offset-4"
            >
              Login
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}

export default Register;