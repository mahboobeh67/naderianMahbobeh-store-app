// src/pages/ProductList.jsx
import { useProducts } from "@/hooks/useProducts";

function ProductList() {
  const { data, isLoading, error } = useProducts({
    page: 1,
    limit: 10,
    minPrice: 1000,
    maxPrice: 9000000,
  });

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در دریافت محصولات</p>;

  return (
    <div>
      <h2>لیست محصولات</h2>

      {data.items.map((item) => (
        <p key={item.id}>
          {item.name} - {item.price} تومان
        </p>
      ))}

      <p>
        صفحه {data.page} از {data.totalPages}
      </p>
    </div>
  );
}

export default ProductList;
