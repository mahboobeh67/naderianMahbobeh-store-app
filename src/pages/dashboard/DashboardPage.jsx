
import styles from "./Dashboard.module.css"
import useDashboardData from "./useDashboardData"
import StatsCards from "./StatsCards/StatsCard"
import SalesChartBox from "./SalesChartBox/SalesChartBox"
import RecentOrders from "./RecentOrders/RecentOrders"
import Messages from "./Messages/Messages"

export default function Dashboard() {
  const {
    stats,
    orders,
    ordersMeta,
    messages,
    chartDataset,

    statsLoading,
    ordersLoading,
    messagesLoading,
    chartLoading,

    statsError,
    ordersError,
    messagesError,
    chartError,

    actions,
  } = useDashboardData()

  const {
    refetchStats,
    refetchOrders,
    refetchMessages,
    refetchChart,
    loadMoreOrders
  } = actions

  return (
    <div className={styles.container}>
      <StatsCards
        items={stats}
        loading={statsLoading}
        error={statsError}
        onRefresh={refetchStats}
      />

      <SalesChartBox
        data={chartDataset}
        loading={chartLoading}
        error={chartError}
        onRefresh={refetchChart}
      />

      <RecentOrders
        orders={orders}
        meta={ordersMeta}
        loading={ordersLoading}
        error={ordersError}
        onLoadMore={loadMoreOrders}
        onRefresh={() => refetchOrders({ reset: true })}
      />

      <Messages
        messages={messages}
        loading={messagesLoading}
        error={messagesError}
        onRefresh={refetchMessages}
      />
    </div>
  )
}
