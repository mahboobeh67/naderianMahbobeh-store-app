import { Line } from "react-chartjs-2"
import styles from "./SalesChartBox.module.css"

export default function SalesChartBox({ data, loading, error, onRefresh }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>نمودار فروش</h3>
        <button className={styles.refreshBtn} onClick={onRefresh}>↻</button>
      </div>

      {error && (
        <div className={styles.errorBox}>خطا در بارگذاری نمودار</div>
      )}

      {loading ? (
        <div className={styles.skeleton}></div>
      ) : (
        <div className={styles.chartWrapper}>
          <Line data={data} />
        </div>
      )}
    </div>
  )
}

