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
      {/* مسیر صحیح لاگین ادمین */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* پنل ادمین - ساختار درست ProtectedRoute */}
      <Route path="/admin" element={<ProtectedRoute role="admin" />}>
        {/* لایه ادمین */}
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="manage" element={<ManageProductPage />} />
        </Route>
      </Route>

      {/* مشتری */}
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<CustomerLoginPage />} />
        <Route path="/login/order" element={<OrdersPage />} />
        <Route path="/profile" element={<CustomerProfile />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Route>
    </Routes>
  );
};

export default App;
