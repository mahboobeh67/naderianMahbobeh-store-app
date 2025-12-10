import StatsCard from "./StatsCard"
import styles from "./StatsCard.module.css"

export default function StatsCards({ items, loading, error, onRefresh }) {
  if (error) {
    return (
      <div className={styles.errorBox}>
        خطا در بارگذاری آمار!  
        <button onClick={onRefresh}>تلاش دوباره</button>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {(loading ? Array(4).fill(null) : items).map((item, i) => (
        <StatsCard
          key={i}
          title={item?.title}
          value={item?.value}
          type={item?.type}
          trend={item?.trend}
          trendValue={item?.trendValue}
          icon={item?.icon}
          loading={loading}
        />
      ))}
    </div>
  )
}
