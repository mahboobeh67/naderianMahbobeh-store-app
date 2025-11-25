import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ProductPage from "./pages/product/ProductPage";
import ProductDetailsPage from "./pages/product/ProductDetailsPage";
import CustomerLoginPage from "./pages/customer/CustomerLoginPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ManageProductPage from "./pages/admin/ManageProductPage";
import OrdersPage from "./pages/customer/OrdersPage";
import ProfilePage from "./pages/customer/ProfilePage";
import ProtectedRoute from "./common/ProtectedRoute";
import Layout from "./layout/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<DashboardPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/manage" element={<ManageProductPage />} />

        <Route path="/login" element={<CustomerLoginPage />} />
        <Route path="/login/order" element={<OrdersPage />} />
        <Route path="/login/profile" element={<ProfilePage />} />

        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route element={<Layout />}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
