import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminHeader from "../components/admin/AdminHeader.jsx";
import AdminSidebar from "../components/admin/AdminSidebar.jsx";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleSidebarToggle() {
    if (window.innerWidth < 1024) {
      setMobileOpen((current) => !current);
      return;
    }

    setCollapsed((current) => !current);
  }

  return (
    <div className="grid-shell !max-w-[1600px]">
      <div className="flex gap-6">
        <AdminSidebar
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
        <div className="min-w-0 flex-1 space-y-6">
          <AdminHeader onToggleSidebar={handleSidebarToggle} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
