import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { saveTokens } from "../../services/tokenStorage";
import apiClient from "../../services/apiClient";
import { useToastContext } from "../../context/ToastContext";
import styles from "./AdminLoginPage.module.css";
import img from "../../images/Union.svg";

function AdminLoginPage() {
  const { login } = useAuth();
  const { showToast } = useToastContext();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 🚀 جلوگیری از دوباره‌زدن Submit هنگام لودینگ
  const onSubmit = async (data) => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await apiClient.post("/auth/login", data);
      const { accessToken, refreshToken, expiresAt } = res.data;

      // امنیتی: ذخیره امن
      saveTokens(accessToken, refreshToken, expiresAt);

      login("admin");

      // ✔ Reset فرم قبل از Navigate
      reset();

      showToast({
        message: "ورود با موفقیت انجام شد",
        type: "success",
        position: "top-center",
      });

      navigate("/admin/dashboard");
    } catch (error) {
      // -------------------------------
      // 🎯 هندل حرفه‌ای خطاها
      // -------------------------------
      if (error.code === "ECONNABORTED") {
        showToast({
          message: "زمان اتصال به سرور تمام شد",
          type: "error",
          position: "top-center",
        });
      }
      else if (!error.response) {
        showToast({
          message: "اتصال اینترنت برقرار نیست",
          type: "error",
          position: "top-center",
        });
      }
      else if (error.response.status === 400) {
        showToast({
          message: "اطلاعات ورودی معتبر نیست",
          type: "error",
          position: "top-center",
        });
      }
      else if (error.response.status === 401) {
        showToast({
          message: "نام کاربری یا رمز عبور اشتباه است",
          type: "error",
          position: "top-center",
        });
      }
      else if (error.response.status >= 500) {
        showToast({
          message: "خطا در سرور! لطفاً دوباره تلاش کنید",
          type: "error",
          position: "top-center",
        });
      }
      else {
        showToast({
          message: "خطای ناشناخته! دوباره تلاش کنید",
          type: "error",
          position: "top-center",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <header>
        <div className={styles.formImg}>
          <img src={img} alt="admin login" />
        </div>
        <h1>صفحه ورود ادمین</h1>
        <p className={styles.formSubtitle}>ورود به مرکز مدیریت فروشگاه</p>
      </header>

      <div className={styles.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Username"
            autoFocus
            disabled={loading}
            className={errors.username ? styles.error : ""}
            {...register("username", {
              required: "نام کاربری الزامی است",
              minLength: { value: 3, message: "حداقل ۳ کاراکتر وارد کنید" },
            })}
          />
          {errors.username && (
            <p className={styles.fieldError}>{errors.username.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            disabled={loading}
            className={errors.password ? styles.error : ""}
            {...register("password", {
              required: "رمز عبور الزامی است",
              minLength: { value: 6, message: "حداقل ۶ کاراکتر وارد کنید" },
            })}
          />
          {errors.password && (
            <p className={styles.fieldError}>{errors.password.message}</p>
          )}

          <button
            className={styles.loginButton}
            disabled={loading}
            style={{ cursor: loading ? "progress" : "pointer" }}
          >
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                در حال ورود...
              </>
            ) : (
              "ورود"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;
