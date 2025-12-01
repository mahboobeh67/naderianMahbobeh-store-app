import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "شنبه", sales: 150000 },
  { day: "یکشنبه", sales: 180000 },
  { day: "دوشنبه", sales: 220000 },
  { day: "سه‌شنبه", sales: 260000 },
  { day: "چهارشنبه", sales: 300000 },
  { day: "پنجشنبه", sales: 280000 },
  { day: "جمعه", sales: 320000 },
];

function SalesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#005c55"
          strokeWidth={3}
          dot={{ r: 6, fill: "#005c55" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SalesChart;
