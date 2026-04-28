// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext.jsx";
// import PageLoader from "./PageLoader.jsx";

// export default function ProtectedRoute({ children, roles }) {
//   const { loading, isAuthenticated, user } = useAuth();
//   const location = useLocation();

//   if (loading) {
//     return <PageLoader />;
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   if (roles?.length && !roles.includes(user.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }


import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import PageLoader from "./PageLoader.jsx";

export default function ProtectedRoute({ children, roles }) {
  const { loading, isAuthenticated, user } = useAuth();
  const location = useLocation();

  // ⏳ Loading state
  if (loading) {
    return <PageLoader />;
  }

  // ❌ Not logged in → go to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // ❌ Wrong role → force admin overview
  if (roles?.length && !roles.includes(user.role)) {
    return <Navigate to="/admin/overview" replace />;
  }

  // ✅ Allow access
  return children ? children : <Outlet />;
}