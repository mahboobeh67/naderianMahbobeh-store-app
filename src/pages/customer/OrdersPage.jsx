import styles from "./OrdersPage.module.css";

function OrdersPage() {
  const orders = [
    { id: 1, total: 320000, date: "1403/08/02", status: "تحویل شده" },
    { id: 2, total: 740000, date: "1403/08/14", status: "در حال ارسال" },
    { id: 3, total: 190000, date: "1403/07/28", status: "لغو شده" },
  ];

  // تابع مپ وضعیت → کلاس CSS
  function getStatusClass(status) {
    switch (status) {
      case "تحویل شده":
        return styles.statusDelivered;
      case "در حال ارسال":
        return styles.statusShipping;
      case "لغو شده":
        return styles.statusCanceled;
      default:
        return "";
    }
  }

  return (
    <div className={styles.ordersContainer}>
      <h2 className={styles.title}>سفارش‌های من</h2>

      <ul className={styles.orderList}>
        {orders.map(o => (
          <li className={styles.orderCard} key={o.id}>
            <div className={styles.orderHeader}>
              <span>سفارش #{o.id}</span>

              <span className={`${styles.statusBadge} ${getStatusClass(o.status)}`}>
                {o.status}
              </span>
            </div>

            <div className={styles.orderDetails}>
              <div>
                <strong>تاریخ: </strong>
                {o.date}
              </div>
              <div>
                <strong>مبلغ: </strong>
                {o.total.toLocaleString("fa-IR")} تومان
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersPage;
