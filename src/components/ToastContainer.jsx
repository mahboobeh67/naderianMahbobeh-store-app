import React from "react";
import { useToast } from "../context/ToastContext";
import styles from "./ToastContainer.module.css"

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className={styles.toast-container}>
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast toast-${t.type}`}
          onClick={() => t.closable && removeToast(t.id)}
        >
          {t.icon && <span className={styles.toast-icon}>{t.icon}</span>}
          <span className={styles.toast-message}>{t.message}</span>

          {t.action && (
            <button
              className={styles.toast-action}
              onClick={(e) => {
                e.stopPropagation();
                t.action.onClick();
                removeToast(t.id);
              }}
            >
              {t.action.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
