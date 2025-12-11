
import styles from "./ConfirmDialog.module.css";

function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            انصراف
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            تأیید
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;
