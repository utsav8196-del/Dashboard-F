// import { Heart, LayoutDashboard, Menu, Package, ShoppingBag, ShoppingCart, User, X } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext.jsx";
// import { useShop } from "../../context/ShopContext.jsx";
// import Logo from "../Logo.jsx";
// import ThemeToggle from "../ThemeToggle.jsx";

// export default function Header() {
//   const { cartCount, wishlistCount } = useShop();
//   const { user, logout } = useAuth();
//   const [mobileOpen, setMobileOpen] = useState(false);

//   useEffect(() => {
//     if (mobileOpen) {
//       document.body.classList.add("overflow-hidden");
//     } else {
//       document.body.classList.remove("overflow-hidden");
//     }
//     return () => document.body.classList.remove("overflow-hidden");
//   }, [mobileOpen]);

//   const navLinks = [
//     { to: "/", label: "Store", icon: ShoppingBag, count: null },
//     { to: "/wishlist", label: "Wishlist", icon: Heart, count: wishlistCount },
//     { to: "/cart", label: "Cart", icon: ShoppingCart, count: cartCount },
//     ...(user ? [{ to: "/orders", label: "Orders", icon: Package, count: null }] : []),
//     ...(user?.role === "admin" ? [{ to: "/admin/overview", label: "Dashboard", icon: LayoutDashboard, count: null }] : []),
//   ];

//   return (
//     <header className="sticky top-0 z-40 border-b bg-[rgba(var(--surface-alt),0.82)] backdrop-blur-xl">
//       <div className="grid-shell flex items-center justify-between gap-3 py-4">
//         <Link to="/">
//           <Logo />
//         </Link>

//         {/* Desktop nav */}
//         <div className="hidden items-center gap-2 lg:flex">
//           {navLinks.map(({ to, label, icon: Icon, count }) => (
//             <NavLink key={to} className="btn-secondary" to={to}>
//               <Icon size={16} className="mr-2" />
//               {count !== null ? `${label} (${count})` : label}
//             </NavLink>
//           ))}
//           <ThemeToggle />
//           {user ? (
//             <button type="button" onClick={logout} className="btn-primary">
//               <User size={16} className="mr-2" />
//               {user.name.split(" ")[0]}
//             </button>
//           ) : (
//             <Link className="btn-primary" to="/login">
//               Sign in
//             </Link>
//           )}
//         </div>
//         <div className="flex items-center gap-2 lg:hidden">
//           <ThemeToggle />
//           <button
//             type="button"
//             onClick={() => setMobileOpen(true)}
//             className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border"
//             aria-label="Open menu"
//           >
//             <Menu size={18} />
//           </button>
//         </div>
//       </div>
//       <div
//         className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
//           }`}
//         aria-hidden={!mobileOpen}
//       >
//         <button
//           type="button"
//           aria-label="Close menu"
//           onClick={() => setMobileOpen(false)}
//           className="absolute inset-0 bg-slate-950/45"
//         />
//         <div
//           className={`absolute right-0 top-0 h-full w-72 md:w-80 p-6 shadow-2xl overflow-y-auto transition-transform duration-300 ease-out ${mobileOpen ? "translate-x-0" : "translate-x-full"
//             }`}
//           style={{ backgroundColor: "rgb(var(--card))" }}
//         >
//           <div className="mb-6 flex items-center justify-between">
//             <p className="font-display text-lg font-bold">Menu</p>
//             <button
//               type="button"
//               onClick={() => setMobileOpen(false)}
//               className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border"
//               aria-label="Close menu"
//             >
//               <X size={18} />
//             </button>
//           </div>
//           <nav className="space-y-2">
//             {navLinks.map(({ to, label, icon: Icon, count }) => (
//               <NavLink
//                 key={to}
//                 to={to}
//                 onClick={() => setMobileOpen(false)}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive ? "bg-ink text-white" : "hover:bg-slate-100 dark:hover:bg-slate-800"}`
//                 }
//               >
//                 <Icon size={18} />
//                 {count !== null ? `${label} (${count})` : label}
//               </NavLink>
//             ))}
//             {user ? (
//               <button
//                 type="button"
//                 onClick={() => {
//                   logout();
//                   setMobileOpen(false);
//                 }}
//                 className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-rose-500 transition hover:bg-rose-50 dark:hover:bg-rose-900/20"
//               >
//                 <User size={18} />
//                 Sign out
//               </button>
//             ) : (
//               <NavLink
//                 to="/login"
//                 onClick={() => setMobileOpen(false)}
//                 className="flex items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white transition"
//               >
//                 <User size={18} />
//                 Sign in
//               </NavLink>
//             )}
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }
import {
  Heart,
  LayoutDashboard,
  Menu,
  Package,
  ShoppingBag,
  ShoppingCart,
  User,
  X,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useShop } from "../../context/ShopContext.jsx";
import Logo from "../Logo.jsx";
import ThemeToggle from "../ThemeToggle.jsx";

export default function Header() {
  const { cartCount, wishlistCount } = useShop();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ Proper scroll lock
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [mobileOpen]);

  const navLinks = [
    { to: "/", label: "Store", icon: ShoppingBag, count: null },
    { to: "/wishlist", label: "Wishlist", icon: Heart, count: wishlistCount },
    { to: "/cart", label: "Cart", icon: ShoppingCart, count: cartCount },
    ...(user
      ? [{ to: "/orders", label: "Orders", icon: Package, count: null }]
      : []),
    ...(user?.role === "admin"
      ? [
        {
          to: "/admin/overview",
          label: "Dashboard",
          icon: LayoutDashboard,
          count: null,
        },
      ]
      : []),
  ];

  return (
    <>
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b bg-[rgba(var(--surface-alt),0.9)] backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/">
            <Logo />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map(({ to, label, icon: Icon, count }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center rounded-xl px-3 py-2 text-sm font-medium transition ${isActive
                    ? "bg-black text-white"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`
                }
              >
                <Icon size={16} className="mr-2" />
                {count !== null ? `${label} (${count})` : label}
              </NavLink>
            ))}

            <ThemeToggle />

            {user ? (
              <button
                onClick={logout}
                className="flex items-center px-3 py-2 rounded-xl bg-black text-white"
              >
                <LogOut size={16} className="mr-2" />
                {user.name.split(" ")[0]}
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center px-3 py-2 rounded-xl bg-black text-white"
              >
                <User size={16} className="mr-2" />
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              className="h-10 w-10 flex items-center justify-center rounded-xl border"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* ✅ MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-[999] md:hidden ${mobileOpen ? "visible" : "invisible"
          }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"
            }`}
        />

        {/* Drawer */}
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white dark:bg-slate-900 shadow-2xl rounded-l-3xl transform transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold">Menu</h2>
            <button
              onClick={() => setMobileOpen(false)}
              className="h-10 w-10 flex items-center justify-center rounded-xl border"
            >
              <X size={18} />
            </button>
          </div>

          {/* Links */}
          <nav className="p-4 space-y-2">
            {navLinks.map(({ to, label, icon: Icon, count }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${isActive
                    ? "bg-black text-white"
                    : "hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`
                }
              >
                <Icon size={18} />
                {count !== null ? `${label} (${count})` : label}
              </NavLink>
            ))}

            {/* Auth */}
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <LogOut size={18} />
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-black text-white text-sm font-semibold"
              >
                <User size={18} />
                Sign in
              </NavLink>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}