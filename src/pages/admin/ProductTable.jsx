import ProductRow from "./ProductRow";

function ProductTable({ products, loading, error, onRetry }) {

  if (loading) return <p>در حال بارگذاری...</p>;

  if (error)
    return (
      <div>
        خطا در دریافت اطلاعات
        <button onClick={onRetry}>تلاش مجدد</button>
      </div>
    );

  if (!products.length) return <p>هیچ محصولی یافت نشد</p>;

  return (
    <table>
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
