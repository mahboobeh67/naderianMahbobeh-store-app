import styles from "./RecentOrders.module.css"

export default function RecentOrders({
  orders,
  meta,
  loading,
  error,
  onLoadMore,
  onRefresh,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>سفارش‌های اخیر</h3>
        <button className={styles.refreshBtn} onClick={onRefresh}>↻</button>
      </div>

      {error && (
        <div className={styles.errorBox}>خطا در بارگذاری سفارش‌ها</div>
      )}

      <ul className={styles.list}>
        {(loading ? Array(3).fill(null) : orders).map((order, i) =>
          loading ? (
            <li key={i} className={styles.skeleton}></li>
          ) : (
            <li key={order.id} className={styles.item}>
              <div className={styles.row}>
                <span className={styles.orderId}>#{order.id}</span>
                <span className={styles.badge}>{order.status}</span>
              </div>
              <div className={styles.details}>
                <span>{order.date}</span>
                <span>{order.total.toLocaleString("fa-IR")} تومان</span>
              </div>
            </li>
          )
        )}
      </ul>

      {meta?.hasMore && !loading && (
        <button className={styles.loadMore} onClick={onLoadMore}>
          بارگذاری بیشتر
        </button>
      )}
    </div>
  )
}

