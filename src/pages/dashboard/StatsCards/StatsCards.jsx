import React from "react"
import StatsCard from "./StatsCard"
import styles from "./styles.module.css"

export default function StatsCards({ items = [], loading, error, onRefresh }) {
  if (error) {
    return (
      <div className={styles.errorBox}>
        خطا در دریافت اطلاعات
        <button onClick={onRefresh}>تلاش مجدد</button>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      {items.map((item) => (
        <StatsCard key={item.id || item.title} {...item} loading={loading} />
      ))}
    </div>
  )
}
