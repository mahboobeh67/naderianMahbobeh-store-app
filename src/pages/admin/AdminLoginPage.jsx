import styles from "./AdminLoginPage.module.css";
import img from "../../images/Union.svg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function AdminLoginPage() {
  const { setUser } = useAuth();
  const { login } = useAuth();
  login("admin");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = e.target.adminName.value.trim();
    const password = e.target.adminPass.value.trim();

    // اعتبارسنجی ساده
    if (!username || !password) {
      alert("لطفاً هر دو فیلد را وارد کنید.");
      return;
    }

    // احراز هویت خیلی ساده (در آینده API واقعی وصل می‌کنیم)
    if (username !== "admin" || password !== "1234") {
      alert("نام کاربری یا رمز عبور اشتباه است.");
      return;
    }

    // 1) ذخیره توکن
    localStorage.setItem("token", "admin_mock_token");

    // 2) ثبت وضعیت کاربر در AuthContext
    setUser({ role: "admin" });

    // 3) هدایت به داشبورد
    navigate("/admin/dashboard");
  };

  return (
    <div className={styles.formContainer}>
      <header>
        <div className={styles.formImg}>
          <img src={img} alt="" />
        </div>

        <h1>صفحه ورود ادمین</h1>
        <p className={styles.formSubtitle}>ورود به مرکز مدیریت فروشگاه</p>
      </header>

      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label htmlFor="adminName">نام کاربری:</label>
            <input
              type="text"
              name="adminName"
              placeholder="نام کاربری خود را وارد کنید"
              id="adminName"
            />
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="adminPass">رمز عبور:</label>
            <input
              type="password"
              name="adminPass"
              placeholder="رمز خود را وارد کنید"
              id="adminPass"
            />
          </div>

          <div className={styles.buttonWrapper}>
            <button type="submit">ورود</button>
          </div>

          <div className={styles.errorBox}></div>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;
