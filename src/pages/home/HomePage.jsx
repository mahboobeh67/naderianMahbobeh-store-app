import { useCategories } from "@/hooks";
import { useProducts } from "@/hooks";
import Header  from "../../layout/header/Header";

export default function Homepage() {
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  const {
    products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useProducts();

  return (
    <div>
    

      <main style={{ padding: "20px" }}>
        <h1>محبوبه جان، به صفحه اصلی خوش اومدی! 🚀</h1>

        {productsLoading && <p>در حال بارگذاری محصولات...</p>}
        {productsError && <p>خطا در دریافت محصولات!</p>}

        <div>
          {products.map((p) => (
            <div key={p.id}>{p.title}</div>
          ))}
        </div>
      </main>
    </div>
  );
}
