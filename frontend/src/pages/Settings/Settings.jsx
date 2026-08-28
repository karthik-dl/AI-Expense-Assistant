import { useState } from "react";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Lock,
  LogOut,
} from "lucide-react";

import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

function Settings() {
  const { user, logout } = useAuth();

  const [name, setName] = useState(
    user?.name || ""
  );

  const [email, setEmail] = useState(
    user?.email || ""
  );

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleProfileUpdate = async (
    event
  ) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }

    try {
      setLoading(true);

      toast.success(
        "Profile update is ready to connect."
      );
    } catch (error) {
      console.error(
        "Profile Update Error:",
        error
      );

      toast.error(
        "Failed to update profile."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (
    event
  ) => {
    event.preventDefault();

    if (!password) {
      toast.error(
        "Please enter a new password."
      );
      return;
    }

    if (password.length < 6) {
      toast.error(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (
      password !== confirmPassword
    ) {
      toast.error(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      toast.success(
        "Password change is ready to connect."
      );

      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(
        "Password Change Error:",
        error
      );

      toast.error(
        "Failed to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="mx-auto w-full max-w-300 space-y-6">

      <PageHeader
        title="Settings"
        subtitle="Manage your profile and account settings."
      />

      {/* Profile */}
      <Card>
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <User size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Profile Information
            </h2>

            <p className="text-sm text-slate-500">
              Update your basic account information.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleProfileUpdate}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter your name"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="email"
                value={email}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-slate-500 outline-none"
              />
            </div>

            <p className="mt-1 text-xs text-slate-400">
              Email cannot be changed here.
            </p>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              loading={loading}
            >
              Save Profile
            </Button>
          </div>
        </form>
      </Card>

      {/* Password */}
      <Card>
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
            <Lock size={22} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Change Password
            </h2>

            <p className="text-sm text-slate-500">
              Create a new password for your account.
            </p>
          </div>
        </div>

        <form
          onSubmit={handlePasswordChange}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              New Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Confirm new password"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              loading={loading}
            >
              Change Password
            </Button>
          </div>
        </form>
      </Card>

      {/* Logout */}
      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Sign Out
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Sign out of your current account.
            </p>
          </div>

          <Button
            type="button"
            variant="danger"
            leftIcon={<LogOut size={17} />}
            onClick={handleLogout}
          >
            Sign Out
          </Button>
        </div>
      </Card>

    </div>
  );
}

export default Settings;