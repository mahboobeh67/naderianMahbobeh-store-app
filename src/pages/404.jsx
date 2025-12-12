import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";
import img from "../images/404.webp"

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>۴۰۴</h1>

      <p className={styles.text}>
صفحه موردنظر پیدا نشد      </p>

      <img
        src={img}
        alt="صفحه مورد نظر پیدا نشد"
        className={styles.image}
      />

      <Link to="/" className={styles.link}>
        🔙 بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}

export default NotFoundPage;
