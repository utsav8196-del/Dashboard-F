// import { Bell, Menu, Store } from "lucide-react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext.jsx";
// import ThemeToggle from "../ThemeToggle.jsx";

// export default function AdminHeader({ onToggleSidebar }) {
//   const { user, logout } = useAuth();

//   return (
//     <header className="panel-muted sticky top-4 z-30 flex items-center justify-between gap-4 px-4 py-3">
//       <div className="flex items-center gap-3 min-w-0">
//         <button
//           type="button"
//           onClick={onToggleSidebar}
//           className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border"
//         >
//           <Menu size={18} />
//         </button>
//         <div className="min-w-0">
//           <p className="hidden sm:block text-xs uppercase tracking-[0.28em] text-[rgb(var(--muted))]">Admin console</p>
//           <h1 className="font-display text-lg sm:text-xl font-bold truncate">Live operations dashboard</h1>
//         </div>
//       </div>
//       <div className="flex items-center gap-2 flex-shrink-0">
//         {/* <Link to="/" className="btn-secondary !px-3 !py-3 sm:!px-4">
//           <Store size={16} className="sm:mr-2" />
//           <span className="hidden sm:inline">Storefront</span>
//         </Link> */}
//         <div className="hidden rounded-2xl border px-4 py-3 text-sm font-semibold md:block">
//           <Bell size={16} className="mr-2 inline" />
//           {user?.name}
//         </div>
//         <ThemeToggle />
//         <button type="button" onClick={logout} className="btn-primary !px-3 !py-3 sm:!px-4">
//           <span className="hidden sm:inline">Sign out</span>
//           <span className="sm:hidden">Out</span>
//         </button>
//       </div>
//     </header>
//   );
// }


import { Bell, Menu, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import ThemeToggle from "../ThemeToggle.jsx";

export default function AdminHeader({ onToggleSidebar }) {
  const { user, logout } = useAuth();

  return (
    <header className="panel-muted sticky top-4 z-30 flex items-center justify-between gap-4 px-4 py-3">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border"
        >
          <Menu size={18} />
        </button>

        <div className="min-w-0">
          {/* MOBILE TITLE */}
          <h1 className="block sm:hidden font-display text-base font-bold truncate">
            Admin
          </h1>

          {/* DESKTOP TITLE */}
          <p className="hidden sm:block text-xs uppercase tracking-[0.28em] text-[rgb(var(--muted))]">
            Admin console
          </p>
          <h1 className="hidden sm:block font-display text-lg sm:text-xl font-bold truncate">
            Live operations dashboard
          </h1>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* USER NAME (desktop only) */}
        <div className="hidden rounded-2xl border px-4 py-3 text-sm font-semibold md:block">
          <Bell size={16} className="mr-2 inline" />
          {user?.name}
        </div>

        <ThemeToggle />

        {/* LOGOUT BUTTON */}
        <button
          type="button"
          onClick={logout}
          className="btn-primary !px-3 !py-3 sm:!px-4 flex items-center justify-center"
        >
          {/* MOBILE: ICON ONLY */}
          <span className="sm:hidden">
            <LogOut size={18} />
          </span>

          {/* DESKTOP: TEXT + ICON */}
          <span className="hidden sm:flex items-center gap-2">
            <LogOut size={16} />
            Sign out
          </span>
        </button>
      </div>
    </header>
  );
}