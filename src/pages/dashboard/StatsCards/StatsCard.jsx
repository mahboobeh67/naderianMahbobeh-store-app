import React from "react"
import styles from "./styles.module.css"

export default function StatsCard({
  title,
  value,
  icon: Icon,
  type = "info",
  trend = "none",
  trendValue,
  backgroundColor,
  loading,
  onClick
}) {
  const className = [
    styles.card,
    styles[type],
    loading ? styles.loading : ""
  ].join(" ")

  return (
    <div
      className={className}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      {loading ? (
        <div className={styles.skeleton}>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonValue}></div>
        </div>
      ) : (
        <>
          <div className={styles.header}>
            <span className={styles.title}>{title}</span>
            {Icon && <Icon className={styles.icon} />}
          </div>

          <div className={styles.value}>{value}</div>

          {trend !== "none" && (
            <div className={styles.trend}>
              <span className={trend === "up" ? styles.trendUp : styles.trendDown}>
                {trend === "up" ? "▲" : "▼"}
              </span>
              <span className={styles.trendValue}>{trendValue}</span>
            </div>
          )}
        </>
      )}
    </div>
  )
}
