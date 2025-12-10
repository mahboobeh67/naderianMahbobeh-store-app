import styles from "./Messages.module.css"

export default function Messages({ messages, loading, error, onRefresh }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>پیام‌ها</h3>
        <button className={styles.refreshBtn} onClick={onRefresh}>↻</button>
      </div>

      {error && (
        <div className={styles.errorBox}>خطا در بارگذاری پیام‌ها</div>
      )}

      <ul className={styles.list}>
        {(loading ? Array(2).fill(null) : messages).map((msg, i) =>
          loading ? (
            <li key={i} className={styles.skeleton}></li>
          ) : (
            <li key={msg.id} className={styles.card}>
              <div className={styles.headerRow}>
                <span>{msg.title}</span>
                <span className={styles.badge}>{msg.status}</span>
              </div>
              <p className={styles.content}>{msg.content}</p>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

