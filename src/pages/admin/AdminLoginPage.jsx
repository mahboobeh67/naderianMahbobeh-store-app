import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { saveTokens } from "../../lib/auth/tokenStorage";
import apiClient from "../../lib/apiClient";
import styles from "./AdminLoginPage.module.css";
import img from "../../images/Union.svg";

function AdminLoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setErrorMessage("");

      const res = await apiClient.post("/auth/login", data);
      const { accessToken, refreshToken, expiresAt } = res.data;

      saveTokens(accessToken, refreshToken, expiresAt);
      login("admin");

      reset();
      navigate("/admin/dashboard");
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorMessage("نام کاربری یا رمز عبور اشتباه است");
      } else if (error.response?.status === 400) {
        setErrorMessage("اطلاعات ورودی معتبر نیست");
      } else if (error.response?.status >= 500) {
        setErrorMessage("خطا در سرور! لطفاً دوباره تلاش کنید");
      } else {
        setErrorMessage("خطای ناشناخته! لطفاً دوباره تلاش کنید");
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
        <p className={styles.formSubtitle}>
          ورود به مرکز مدیریت فروشگاه
        </p>
      </header>

      <div className={styles.form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Username"
            autoFocus
            className={errors.username ? styles.error : ""}
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className={styles.fieldError}>نام کاربری الزامی است</p>
          )}

          <input
            type="password"
            placeholder="Password"
            className={errors.password ? styles.error : ""}
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className={styles.fieldError}>رمز عبور الزامی است</p>
          )}

          <button className={styles.loginButton} disabled={loading}>
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                در حال ورود...
              </>
            ) : (
              "ورود"
            )}
          </button>

          {errorMessage && (
            <p className={styles.errorBox}>{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AdminLoginPage;

