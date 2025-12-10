
import styles from "./ProductTable.module.css";
import ProductRow from "./ProductRow";

export default function ProductTable({ isLoading, items }) {
  // Skeleton rows: just for visual loading state
  const skeletonRows = Array.from({ length: 6 });

  // 1) LOADING STATE
  if (isLoading) {
    return (
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام محصول</th>
              <th>قیمت</th>
              <th>عملیات</th>
            </tr>
          </thead>

          <tbody>
            {skeletonRows.map((_, i) => (
              <tr key={i} className={styles.skeletonRow}>
                <td><div className={styles.skeletonBlock} /></td>
                <td><div className={styles.skeletonBlock} /></td>
                <td><div className={styles.skeletonBlock} /></td>
                <td><div className={styles.skeletonBlock} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // 2) EMPTY STATE
  if (!isLoading && (!items || items.length === 0)) {
    return (
      <div className={styles.emptyWrapper}>
        <div className={styles.emptyBox}>
          <p className={styles.emptyTitle}>هیچ محصولی یافت نشد</p>
          <p className={styles.emptySubtitle}>
            می‌تونی از بالا محصول جدید اضافه کنی یا فیلترها رو تغییر بدی
          </p>
        </div>
      </div>
    );
  }

  // 3) REAL DATA
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>شناسه</th>
            <th>نام محصول</th>
            <th>قیمت</th>
            <th>عملیات</th>
          </tr>
        </thead>

        <tbody>
          {items.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

