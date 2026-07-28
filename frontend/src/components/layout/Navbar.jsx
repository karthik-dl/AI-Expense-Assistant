import { Bell, Search, Sun, Moon, Menu } from "lucide-react";
import { useState } from "react";
import Avatar from "../ui/Avatar";
import Input from "../ui/Input";

function Navbar({
  title = "Dashboard",
  subtitle = "Welcome back!",
  onMenuClick,
}) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {title}
          </h1>

          <p className="text-sm text-slate-500">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden w-80 md:block">
          <Input
            placeholder="Search..."
            leftIcon={<Search size={18} />}
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-xl border border-slate-200 p-2 hover:bg-slate-100"
        >
          {darkMode ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        {/* Notification */}
        <button className="relative rounded-xl border border-slate-200 p-2 hover:bg-slate-100">
          <Bell size={20} />

          <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-slate-100">
          <Avatar
            name="Karthik D L"
            status="online"
          />

          <div className="hidden text-left lg:block">
            <h4 className="text-sm font-semibold text-slate-900">
              Karthik D L
            </h4>

            <p className="text-xs text-slate-500">
              Python Developer
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}

export default Navbar;