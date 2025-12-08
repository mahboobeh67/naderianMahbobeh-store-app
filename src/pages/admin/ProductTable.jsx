import ProductRow from "./ProductRow";
import styles from "./ProductTable.module.css";

function ProductTable({ products, loading, error, onRetry }) {
  // Loading: Skeleton Loader
  if (loading) {
    return (
      <div className={styles.skeletonWrapper}>
        {[...Array(5)].map((_, i) => (
          <div key={i} className={styles.skeletonLine} />
        ))}
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className={styles.errorBox}>
        <p>خطا در دریافت اطلاعات محصولات</p>
        <button className={styles.retryBtn} onClick={onRetry}>
          تلاش مجدد
        </button>
      </div>
    );
  }

  // Empty State
  if (!products.length) {
    return <p className={styles.emptyText}>هیچ محصولی یافت نشد</p>;
  }

  // Table
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>نام</th>
          <th>قیمت</th>
          <th>موجودی</th>
          <th>شناسه</th>
          <th>عملیات</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <ProductRow key={p.id} product={p} />
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;

