import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser } from "../../services/authService";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function Register() {
  const navigate = useNavigate();

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

      toast.success("Registration successful! Please login.");

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Left Section */}
        <div className="bg-blue-600 text-white flex flex-col justify-center p-10">
          <h1 className="text-4xl font-bold mb-4">
            AI Expense Assistant
          </h1>

          <p className="text-blue-100 text-lg">
            Create your account and start managing your income,
            expenses and budgets with AI-powered insights.
          </p>
        </div>

        {/* Right Section */}
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-8">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>

            <Input
              label="Full Name"
              name="name"
              placeholder="Enter your full name"
              register={register}
              rules={{
                required: "Name is required",
              }}
              errors={errors}
            />

            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              register={register}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email",
                },
              }}
              errors={errors}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Enter password"
              register={register}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              errors={errors}
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              register={register}
              rules={{
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
              errors={errors}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating Account..." : "Register"}
            </Button>
          </form>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;