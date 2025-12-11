import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../services/apiClient"; 
import styles from "./SalesChart.module.css";

/* Mapper → تبدیل خروجی API به dataset مناسب Recharts */
function transformSalesData(apiData) {
  if (!apiData || !apiData.days || !apiData.sales) return [];

  return apiData.days.map((day, index) => ({
    day,
    sales: apiData.sales[index] ?? 0,
  }));
}

function SalesChart() {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["dashboard-sales"],
    queryFn: async () => {
      const res = await apiClient.get("/dashboard/sales");
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5 دقیقه
  });

  const chartData = transformSalesData(data);

  if (isLoading) {
    return (
      <div className={styles.loadingBox}>
        <span className={styles.spinner}></span>
        <p>در حال بارگذاری نمودار فروش...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorBox}>
        <p>خطایی در دریافت اطلاعات نمودار رخ داد.</p>
        <button onClick={refetch}>تلاش دوباره</button>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>نمودار فروش هفتگی</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />

          <XAxis dataKey="day" tickMargin={10} />
          <YAxis tickFormatter={(v) => v.toLocaleString()} />

          <Tooltip
            contentStyle={{ direction: "rtl", textAlign: "right" }}
            formatter={(v) => `${v.toLocaleString()} ریال`}
          />

          <Line
            type="monotone"
            dataKey="sales"
            stroke="#005c55"
            strokeWidth={3}
            dot={{ r: 6, fill: "#005c55" }}
            activeDot={{ r: 9 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;


