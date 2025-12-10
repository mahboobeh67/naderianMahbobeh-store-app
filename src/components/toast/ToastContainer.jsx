
import ToastItem from "./ToastItem";
import styles from "./ToastContainer.module.css";
import { useToastContext } from "../../context/ToastContext";
import { TOAST_POSITIONS } from "./toast.types";

function ToastContainer({ position = TOAST_POSITIONS.TOP_RIGHT }) {
  const { toasts } = useToastContext();

  // نقشه‌ی کلاس‌های موقعیت (فقط UI concern)
  const positionClasses = {
    [TOAST_POSITIONS.TOP_LEFT]: styles.topLeft,
    [TOAST_POSITIONS.TOP_CENTER]: styles.topCenter,
    [TOAST_POSITIONS.TOP_RIGHT]: styles.topRight,
    [TOAST_POSITIONS.BOTTOM_LEFT]: styles.bottomLeft,
    [TOAST_POSITIONS.BOTTOM_CENTER]: styles.bottomCenter,
    [TOAST_POSITIONS.BOTTOM_RIGHT]: styles.bottomRight,
  };

  // تعیین جهت انباشته شدن بر اساس top vs bottom
  const stackDirection =
    position.startsWith("top") ? styles.stackTop : styles.stackBottom;

  return (
    <div className={`${styles.container} ${positionClasses[position]} ${stackDirection}`}>
      {toasts
        .filter((t) => t.position === position) // فقط toastهای مربوط به همین Container
        .map((toast) => (
          <ToastItem
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            position={toast.position}
          />
        ))}
    </div>
  );
}

export default ToastContainer;
