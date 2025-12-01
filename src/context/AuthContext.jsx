import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  // ---------------------------------------------------
  // مقدار اولیه: با localStorage اما به‌صورت امن‌تر
  // ---------------------------------------------------
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("auth");
    return saved ? JSON.parse(saved) : { role: "guest", token: null };
  });

  // ---------------------------------------------------
  // ذخیره‌سازی خودکار هر بار تغییر user
  // ---------------------------------------------------
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(user));
  }, [user]);

  // ---------------------------------------------------
  // login با نقش دلخواه: admin, customer, guest
  // ---------------------------------------------------
  const login = (role = "guest") => {
    const mockToken = `${role}_token_mock`;

    const newUser = {
      role,
      token: mockToken,
    };

    setUser(newUser);

    // مسیر دینامیک بر اساس نقش
    if (role === "admin") navigate("/admin/dashboard", { replace: true });
    else if (role === "customer") navigate("/profile", { replace: true });
    else navigate("/", { replace: true });
  };

  // ---------------------------------------------------
  // Logout کامل
  // ---------------------------------------------------
  const logout = () => {
    setUser({ role: "guest", token: null });
    localStorage.removeItem("auth");
    navigate("/login", { replace: true });
  };

  // ---------------------------------------------------
  // Helper Methods (بسیار مهم)
  // ---------------------------------------------------
  const isAuthenticated = user.token !== null;
  const isAdmin = user.role === "admin";
  const isCustomer = user.role === "customer";

  // ---------------------------------------------------
  // Auto Redirect مثال:
  // اگر کاربر لاگین باشد و برود /admin/login → بفرستش داشبورد
  // ---------------------------------------------------
  useEffect(() => {
    if (isAdmin && location.pathname === "/admin/login") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [location.pathname, isAdmin]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isAdmin,
        isCustomer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// برای مصرف
export function useAuth() {
  return useContext(AuthContext);
}
