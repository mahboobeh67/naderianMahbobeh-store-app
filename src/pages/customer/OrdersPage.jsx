
function OrdersPage() {
  const orders = [
    { id: 1, total: 320000, date: "1403/08/02", status: "تحویل شده" },
    { id: 2, total: 740000, date: "1403/08/14", status: "در حال ارسال" },
  ];

  return (
    <div>
      <h2>سفارش‌های من</h2>

      <ul>
        {orders.map(o => (
          <li key={o.id}>
            سفارش #{o.id} — {o.total} تومان — {o.date} — {o.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersPage;
