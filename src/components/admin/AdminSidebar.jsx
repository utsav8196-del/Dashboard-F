import { Boxes, ChartNoAxesCombined, PackageCheck, Users, FileText } from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "../Logo.jsx";

const links = [
  { to: "/admin/overview", label: "Overview", icon: ChartNoAxesCombined },
  { to: "/admin/products", label: "Products", icon: Boxes },
  { to: "/admin/bills", label: "Bills", icon: FileText },
  { to: "/admin/orders", label: "Orders", icon: PackageCheck },
  { to: "/admin/users", label: "Users", icon: Users },
];

export default function AdminSidebar({ collapsed, mobileOpen, onClose }) {
  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/45 lg:hidden"
        />
      ) : null}
      <aside
        className={`panel-muted fixed left-4 top-4 z-50 flex h-[calc(100vh-2rem)] flex-col p-4 transition-transform lg:sticky lg:left-0 lg:top-4 ${collapsed ? "w-24" : "w-72"} ${mobileOpen ? "translate-x-0" : "-translate-x-[120%]"} lg:translate-x-0`}
      >
        <div className="mb-8 overflow-hidden">{collapsed ? <div className="text-center font-display text-2xl font-bold">P</div> : <Logo />}</div>
        <nav className="space-y-2">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-ink text-white" : "hover:bg-slate-100 dark:hover:bg-slate-800"}`
              }
            >
              <Icon size={18} />
              {!collapsed && label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
