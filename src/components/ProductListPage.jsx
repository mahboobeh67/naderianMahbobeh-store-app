import useProducts from "@/hooks/useProducts";

function ProductList() {
  const { data, isLoading, error } = useProducts({
    page: 1,
    limit: 10,
    minPrice: 1000,
    maxPrice: 9000000,
  });

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در دریافت محصولات</p>;

  if (!data) return <p>هنوز داده‌ای وجود ندارد</p>;

  // بررسی اینکه data آرایه است یا آبجکت با items
  const productList = Array.isArray(data) ? data : data.items || [];

  return (
    <div>
      <h2>لیست محصولات</h2>

      {productList.map((item) => (
        <p key={item.id}>
          {item.name} - {item.price} تومان
        </p>
      ))}

      {data.page && (
        <p>
          صفحه {data.page} از {data.totalPages}
        </p>
      )}
    </div>
  );
}

export default ProductList;
