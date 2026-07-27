import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

function Login() {

    const navigate = useNavigate();

const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    try{

        const response = await loginUser(data);

        login(
            response.user,
            response.access_token
        );

        toast.success("Login Successful");

        navigate("/dashboard");

    }
    catch(error){

        toast.error(
            error.response?.data?.message ||
            "Invalid Credentials"
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
            Track your expenses, analyse your finances,
            and get AI-powered insights to make smarter
            financial decisions.
          </p>
        </div>

        {/* Right Section */}
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-8">
            Welcome Back 👋
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>

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
  placeholder="Enter your password"
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

            <Button type="submit">
              Login
            </Button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;