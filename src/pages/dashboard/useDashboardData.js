import { useQuery, useInfiniteQuery } from "@tanstack/react-query"
import { useMemo, useCallback } from "react"
import { 
  fetchStats,
  fetchRecentOrders,
  fetchMessages,
  fetchSalesChart
} from "../../api/dashboard"

export default function useDashboardData() {

  // --- 1) Stats --------------------------------------------------------
  const {
    data: statsRaw,
    isLoading: statsLoading,
    isFetching: statsFetching,
    error: statsError,
    refetch: refetchStats,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  })

  const stats = useMemo(() => {
    return (statsRaw ?? []).map(s => ({
      title: s.title,
      value: s.value,
      type: s.type,
      icon: s.icon,
      trend: s.trend,
      trendValue: s.trendValue,
    }))
  }, [statsRaw])

  // --- 2) Recent Orders (Infinite) -------------------------------------
  const {
    data: ordersPages,
    isLoading: ordersLoading,
    isFetching: ordersFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    error: ordersError,
    refetch: refetchOrders,
  } = useInfiniteQuery({
    queryKey: ["orders"],
    queryFn: ({ pageParam = 1 }) => fetchRecentOrders({ page: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextPage : undefined
    },
    refetchOnWindowFocus: false,
  })

  const orders = useMemo(() => {
    return ordersPages?.pages?.flatMap(p => p.data) ?? []
  }, [ordersPages])

  const ordersMeta = useMemo(() => ({
    hasMore: hasNextPage,
    isFetchingMore: isFetchingNextPage,
    page: ordersPages?.pages?.length ?? 1,
  }), [hasNextPage, isFetchingNextPage, ordersPages])

  // --- 3) Messages ------------------------------------------------------
  const {
    data: messagesRaw,
    isLoading: messagesLoading,
    isFetching: messagesFetching,
    error: messagesError,
    refetch: refetchMessages,
  } = useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
    staleTime: 15_000,
    refetchOnWindowFocus: false,
  })

  const messages = useMemo(() => messagesRaw ?? [], [messagesRaw])

  const unreadMessagesCount = useMemo(() => {
    return messages.reduce((acc, m) => acc + (m.read ? 0 : 1), 0)
  }, [messages])

  // --- 4) Sales Chart ---------------------------------------------------
  const {
    data: chartRaw,
    isLoading: chartLoading,
    isFetching: chartFetching,
    error: chartError,
    refetch: refetchChart,
  } = useQuery({
    queryKey: ["sales-chart"],
    queryFn: fetchSalesChart,
    refetchOnWindowFocus: false,
  })

  const chartDataset = useMemo(() => {
    if (!chartRaw) return null
    return {
      labels: chartRaw.labels,
      datasets: [
        {
          label: "Sales",
          data: chartRaw.values,
          backgroundColor: "rgba(54, 162, 235, 0.4)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
        }
      ]
    }
  }, [chartRaw])

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
  }), [])

  // --- 5) Composite Loading / Errors -----------------------------------
  const anyLoading = statsLoading || ordersLoading || messagesLoading || chartLoading
  const anyError = statsError || ordersError || messagesError || chartError

  const isRefreshing = 
    (statsFetching && !statsLoading) ||
    (ordersFetching && !ordersLoading) ||
    (messagesFetching && !messagesLoading) ||
    (chartFetching && !chartLoading)

  // --- 6) Actions -------------------------------------------------------
  const loadMoreOrders = useCallback(() => {
    if (hasNextPage) fetchNextPage()
  }, [fetchNextPage, hasNextPage])

  const refetchAll = useCallback(async () => {
    await Promise.all([
      refetchStats(),
      refetchOrders(),
      refetchMessages(),
      refetchChart(),
    ])
  }, [refetchStats, refetchOrders, refetchMessages, refetchChart])

  // --- 7) Return --------------------------------------------------------
  return {
    // Main Data
    stats,
    orders,
    ordersMeta,
    messages,
    chartDataset,
    chartOptions,

    // Loading States
    statsLoading,
    ordersLoading,
    messagesLoading,
    chartLoading,

    // Errors
    statsError,
    ordersError,
    messagesError,
    chartError,

    // Composite
    derived: {
      unreadMessagesCount,
      anyLoading,
      anyError,
      isRefreshing,
    },

    // UI Actions
    actions: {
      refetchAll,
      refetchStats,
      refetchOrders,
      refetchMessages,
      refetchChart,
      loadMoreOrders,
    },
  }
}
