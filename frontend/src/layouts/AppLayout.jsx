import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:ml-72">
        <Navbar
          onMenuClick={() =>
            setSidebarOpen(true)
          }
        />

        <main className="min-h-[calc(100vh-80px)] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;