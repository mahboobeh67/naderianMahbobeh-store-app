import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ProductPage from "./pages/product/ProductPage";
import ProductDetailsPage from "./pages/product/ProductDetailsPage";
import CustomerLoginPage from "./pages/customer/CustomerLoginPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ManageProductPage from "./pages/admin/ManageProductPage";
import OrdersPage from "./pages/customer/OrdersPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Layout from "./layout/Layout";
import CustomerProfile from "./pages/customer/CustomerProfile";
import AdminLayout from "./layout/admin/AdminLayout";

const App = () => {
  return (
    <Routes>

      {/* ------- ADMIN AUTH ------- */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      <Route
        path="/admin"
        element={<ProtectedRoute role="admin" />}
      >
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="manage" element={<ManageProductPage />} />
        </Route>
      </Route>

      {/* ------- CUSTOMER AREA ------- */}
      <Route element={<Layout />}>

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<CustomerLoginPage />} />

        {/* Protected customer routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute role="customer">
              <CustomerProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute role="customer">
              <OrdersPage />
            </ProtectedRoute>
          }
        />

        {/* Products */}
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Route>

      {/* 403 Page */}
      <Route path="/403" element={<div>403 - دسترسی ندارید!</div>} />

    </Routes>
  );
};

export default App;
