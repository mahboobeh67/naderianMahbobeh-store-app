import styles from "./Modal.module.css";

function Modal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        {/* عنوان و دکمه بستن */}
        <div className={styles.header}>
          <h3>{title}</h3>
          <button className={styles.closeBtn} onClick={onCancel}>×</button>
        </div>

        {/* متن */}
        <div className={styles.body}>
          <p>{message}</p>
        </div>

        {/* دکمه‌ها */}
        <div className={styles.footer}>
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

export default Modal;
