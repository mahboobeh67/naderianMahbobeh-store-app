import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { 
  fetchStats, 
  fetchRecentOrders, 
  fetchMessages, 
  fetchSalesChart 
} from "../../api/dashboard";

export default function useDashboardData() {
  
  // --- 1) Stats ---
  const {
    data: statsRaw,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
    staleTime: 60_000, // 1min
  })

  // Transforming stats for StatsCards
  const stats = statsRaw?.map(item => ({
    title: item.title,
    value: item.value,
    icon: item.icon,
    type: item.type,
    trend: item.trend,
    trendValue: item.trendValue,
  })) ?? []

  // --- 2) Recent Orders (Infinite Pagination) ---
  const {
    data: ordersPages,
    isLoading: ordersLoading,
    error: ordersError,
    fetchNextPage: loadMoreOrders,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchOrders,
  } = useInfiniteQuery({
    queryKey: ['orders'],
    queryFn: ({ pageParam = 1 }) => fetchRecentOrders({ page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasMore) return undefined
      return lastPage.nextPage
    }
  })

  // Flatten pages
  const orders =
    ordersPages?.pages?.flatMap(p => p.data) ?? []

  const ordersMeta = {
    hasMore: hasNextPage,
    isFetchingMore: isFetchingNextPage,
    page: ordersPages?.pages?.length ?? 1,
  }

  // --- 3) Messages ---
  const {
    data: messages,
    isLoading: messagesLoading,
    error: messagesError,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
    staleTime: 15_000,
  })

  // --- 4) Sales Chart Dataset ---
  const {
    data: chartRaw,
    isLoading: chartLoading,
    error: chartError,
    refetch: refetchChart,
  } = useQuery({
    queryKey: ['sales-chart'],
    queryFn: fetchSalesChart,
  })

  // Transform to full dataset
  const chartDataset = chartRaw
    ? {
        labels: chartRaw.labels,
        datasets: [
          {
            label: "Sales",
            data: chartRaw.values,
            backgroundColor: "rgba(54, 162, 235, 0.4)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 2,
          }
        ],
        options: { responsive: true }
      }
    : null

  // --- 5) Derived values ---
  const unreadMessagesCount = messages?.filter(m => !m.read).length ?? 0

  // --- 6) Actions ---
  const refetchAll = () => {
    refetchStats()
    refetchOrders()
    refetchMessages()
    refetchChart()
  }

  return {
    // Data
    stats,
    orders,
    ordersMeta,
    messages,
    chartDataset,

    // Loading flags
    statsLoading,
    ordersLoading,
    messagesLoading,
    chartLoading,

    // Error flags
    statsError,
    ordersError,
    messagesError,
    chartError,

    // Actions for UI
    actions: {
      refetchAll,
      refetchStats,
      refetchOrders,
      refetchMessages,
      refetchChart,
      loadMoreOrders,
    },

    // Derived
    derived: {
      unreadMessagesCount,
    }
  }
}
