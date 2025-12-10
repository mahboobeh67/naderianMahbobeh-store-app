import { useLogin } from "@/hooks/useLogin";
import { useToastContext } from "@/components/Toast/ToastContext";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const login = useLogin();
  const { showToast } = useToastContext();

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const remember = form.remember.checked;

    if (!email || !password) {
      showToast({
        message: "ایمیل و رمز عبور را وارد کنید.",
        type: "error",
        position: "top-center",
      });
      return;
    }

    login.mutate(
      { email, password, remember },
      {
        onSuccess: () => {
          showToast({
            message: "با موفقیت وارد شدید!",
            type: "success",
            position: "top-center",
          });
        },
        onError: (err) => {
          const msg =
            err?.response?.data?.message ||
            err?.message ||
            "خطای ناشناخته! لطفاً دوباره تلاش کنید.";

          showToast({
            message: msg,
            type: "error",
            position: "top-center",
          });
        },
      }
    );
  }

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <h2>ورود به حساب</h2>

        <div className={styles.inputGroup}>
          <label>ایمیل</label>
          <input name="email" type="email" />
        </div>

        <div className={styles.inputGroup}>
          <label>رمز عبور</label>
          <input name="password" type="password" />
        </div>

        <div className={styles.optionsRow}>
          <label className={styles.rememberMe}>
            <input type="checkbox" name="remember" /> مرا به خاطر بسپار
          </label>

          <a href="#" className={styles.forgotLink}>
            فراموشی رمز؟
          </a>
        </div>

        <button disabled={login.isPending} className={styles.loginBtn}>
          {login.isPending ? "در حال ورود..." : "ورود"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;

