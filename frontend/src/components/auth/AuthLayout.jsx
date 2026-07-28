import { Link } from "react-router-dom";

function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLabel,
  footerLink,
}) {
  return (
    <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center p-6">
      <div className="w-[95%] h-[95vh] rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="grid h-full lg:grid-cols-[32%_68%]">
          {/* LEFT SIDE */}
          <div className="bg-[#081633] flex flex-col items-center justify-center px-12 py-12 rounded-l-2xl">

            {/* Logo */}
            <div className="flex items-center gap-4 mb-16">
              <img
                src="/unnamed.png"
                alt="Logo"
                className="w-14 h-14 object-contain"
              />

              <div className="text-left">
                <h1 className="text-2xl font-bold text-white">
                  AI Expense Assistant
                </h1>

                <p className="text-sm text-slate-400">
                  Smart Finance Tracker
                </p>
              </div>
            </div>

            {/* Illustration */}
            <img
              src="/ExpenseTracker.jfif"
              alt="Illustration"
              className="w-90 object-contain rounded-xl mb-16"
            />

            {/* Bottom Content */}
            <div className="max-w-lg text-center">
              <h2 className="text-4xl font-bold text-white leading-tight mb-5">
                Manage your money smarter.
              </h2>

              <p className="text-lg leading-8 text-slate-400">
                Track expenses, monitor budgets and get AI-powered financial
                insights to improve your savings.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-center bg-white rounded-r-2xl px-24">
            <div className="w-full max-w-md">

              <h1 className="text-[44px] font-bold tracking-tight text-slate-900">
                {title}
              </h1>

              <p className="mt-3 mb-14 text-base leading-7 text-slate-500">
                {subtitle}
              </p>

              {children}

              <div className="mt-12 text-center text-sm text-slate-600">
                {footerText}{" "}
                <Link
                  to={footerLink}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  {footerLabel}
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;