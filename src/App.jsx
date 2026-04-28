import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PageLoader from "./components/PageLoader.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./styles/scrollbar.css"; // ✨ Global custom scrollbar styling

const AdminLayout = lazy(() => import("./layouts/AdminLayout.jsx"));
const StoreLayout = lazy(() => import("./layouts/StoreLayout.jsx"));
const CartPage = lazy(() => import("./pages/CartPage.jsx"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage.jsx"));
const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const LoginPage = lazy(() => import("./pages/LoginPage.jsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.jsx"));
const OrdersPage = lazy(() => import("./pages/OrdersPage.jsx"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage.jsx"));
const RegisterPage = lazy(() => import("./pages/RegisterPage.jsx"));
const WishlistPage = lazy(() => import("./pages/WishlistPage.jsx"));
const DashboardOrdersPage = lazy(() => import("./pages/admin/DashboardOrdersPage.jsx"));
const DashboardOverviewPage = lazy(() => import("./pages/admin/DashboardOverviewPage.jsx"));
const DashboardProductsPage = lazy(() => import("./pages/admin/DashboardProductsPage.jsx"));
const DashboardUsersPage = lazy(() => import("./pages/admin/DashboardUsersPage.jsx"));
const DashboardBillsPage = lazy(() => import("./pages/admin/DashboardBillsPage.jsx"));

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<StoreLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products/:id" element={<ProductDetailsPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="orders"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route
          path="admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<DashboardOverviewPage />} />
          <Route path="products" element={<DashboardProductsPage />} />
          <Route path="bills" element={<DashboardBillsPage />} />
          <Route path="orders" element={<DashboardOrdersPage />} />
          <Route path="users" element={<DashboardUsersPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
