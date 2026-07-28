import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
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

      <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-blue-600 p-16 text-white">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold leading-tight">
            Join ExpenseAI
          </h1>

          <p className="mt-6 text-lg text-blue-100">
            Take control of your finances with
            smart expense tracking, budgeting,
            analytics and AI insights.
          </p>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex flex-1 items-center justify-center bg-slate-50 px-6">
        <Card
          className="w-full max-w-md"
          hover={false}
        >
          <h2 className="text-3xl font-bold">
            Create Account
          </h2>

          <p className="mt-2 text-slate-500">
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

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:underline"
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