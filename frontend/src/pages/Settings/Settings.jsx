import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

function Settings() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const [notifications, setNotifications] =
    useState(
      localStorage.getItem("notifications") !==
        "false"
    );

  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "INR"
  );

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark"
    );

    localStorage.setItem(
      "theme",
      theme
    );
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(
      "notifications",
      notifications
    );
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(
      "currency",
      currency
    );
  }, [currency]);

  const handleSave = () => {
    localStorage.setItem(
      "theme",
      theme
    );

    localStorage.setItem(
      "notifications",
      notifications
    );

    localStorage.setItem(
      "currency",
      currency
    );

    toast.success(
      "Settings saved successfully."
    );
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Settings"
        subtitle="Customize your ExpenseAI preferences."
      />

      <div className="grid gap-6 xl:grid-cols-2">

        <Card>
          <h2 className="mb-6 text-xl font-semibold text-slate-800">
            Appearance
          </h2>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Theme
            </label>

            <select
              value={theme}
              onChange={(event) =>
                setTheme(event.target.value)
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="light">
                Light
              </option>

              <option value="dark">
                Dark
              </option>
            </select>
          </div>
        </Card>

        <Card>
          <h2 className="mb-6 text-xl font-semibold text-slate-800">
            Notifications
          </h2>

          <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
            <div>
              <h3 className="font-medium text-slate-800">
                Budget Alerts
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Receive alerts when your spending
                approaches your budget.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                setNotifications(
                  !notifications
                )
              }
              className={`relative h-7 w-12 rounded-full transition ${
                notifications
                  ? "bg-blue-600"
                  : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                  notifications
                    ? "left-6"
                    : "left-1"
                }`}
              />
            </button>
          </div>
        </Card>

        <Card>
          <h2 className="mb-6 text-xl font-semibold text-slate-800">
            Currency
          </h2>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Default Currency
            </label>

            <select
              value={currency}
              onChange={(event) =>
                setCurrency(event.target.value)
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value="INR">
                INR (₹) - Indian Rupee
              </option>

              <option value="USD">
                USD ($) - US Dollar
              </option>

              <option value="EUR">
                EUR (€) - Euro
              </option>
            </select>
          </div>
        </Card>

        <Card>
          <h2 className="mb-6 text-xl font-semibold text-slate-800">
            Save Preferences
          </h2>

          <p className="mb-5 text-sm leading-6 text-slate-500">
            Your preferences are saved locally in
            your browser.
          </p>

          <Button
            type="button"
            onClick={handleSave}
          >
            Save Settings
          </Button>
        </Card>

      </div>
    </div>
  );
}

export default Settings;