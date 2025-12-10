import  { useEffect, useState } from "react";
import styles from "./toastItem.module.css";
import { useToastContext } from "../../context/ToastContext";
import {
  TOAST_DURATION,
  TOAST_VARIANTS,
  getAnimationClasses,
} from "./toast.types";

function ToastItem({ id, message, type = TOAST_VARIANTS.DEFAULT, position }) {
  const { removeToast } = useToastContext();
  const [leaving, setLeaving] = useState(false);

  // دریافت کلاس‌های انیمیشن مخصوص position
  const { enter, exit } = getAnimationClasses(position);

  useEffect(() => {
    const timer = setTimeout(() => startExit(), TOAST_DURATION);
    return () => clearTimeout(timer);
  }, []);

  const startExit = () => {
    setLeaving(true);
    setTimeout(() => removeToast(id), 250); // زمان انیمیشن خروج
  };

  return (
    <div
      className={`${styles.toast} ${
        leaving ? styles[exit] : styles[enter]
      } ${styles[type] || ""}`}
    >
      <div className={styles.message}>{message}</div>

      <button className={styles.closeBtn} onClick={startExit}>
        ✕
      </button>
    </div>
  );
}

export default ToastItem;

