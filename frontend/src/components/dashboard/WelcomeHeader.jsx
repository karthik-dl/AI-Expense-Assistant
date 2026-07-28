import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function WelcomeHeader() {
  const { user } = useAuth();

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 flex flex-col justify-between gap-5 rounded-3xl bg-linear-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-xl lg:flex-row lg:items-center"
    >
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.name || "User"} 👋
        </h1>

        <p className="mt-2 text-blue-100">
          Here's an overview of your financial activity.
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-xl bg-white/10 px-5 py-3 backdrop-blur">
        <CalendarDays size={20} />

        <span>{today}</span>
      </div>
    </motion.div>
  );
}

export default WelcomeHeader;