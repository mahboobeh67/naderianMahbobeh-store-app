import styles from "./ProductList.module.css";
import useProducts from "@/hooks/useProducts";
import { useState } from "react";

export default function ProductList() {
  const [filters, setFilters] = useState({
    page: 1,
    minPrice: 1000,
    maxPrice: 9000000,
  });

  const { data, isLoading, error } = useProducts(filters);

  const { items = [], meta = {} } = data || {};

  function changeFilter(field, value) {
    setFilters((prev) => ({ ...prev, page: 1, [field]: value }));
  }

  if (error) return <p className={styles.error}>خطا در دریافت محصولات!</p>;

  return (
    <div className={styles.wrapper}>
      {/* Filters */}
      <div className={styles.filters}>
        <label>
          حداقل قیمت:
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => changeFilter("minPrice", Number(e.target.value))}
          />
        </label>

        <label>
          حداکثر قیمت:
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => changeFilter("maxPrice", Number(e.target.value))}
          />
        </label>
      </div>

      {/* PRODUCT GRID */}
      <div className={styles.grid}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className={styles.cardSkeleton} />
            ))
          : items.map((p) => (
              <a href={`/product/${p.id}`} key={p.id} className={styles.card}>
                <div className={styles.cardImageWrapper}>
                  <img
                    src={p.image || "/placeholder.png"}
                    alt={p.name}
                    className={styles.cardImage}
                  />
                </div>

                <h3 className={styles.cardTitle}>{p.name}</h3>

                <p className={styles.cardPrice}>
                  {p.price.toLocaleString()} تومان
                </p>
              </a>
            ))}
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        {meta.page > 1 && (
          <button
            onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
          >
            قبلی
          </button>
        )}

        {meta.hasMore && (
          <button
            onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
          >
            بعدی
          </button>
        )}
      </div>
    </div>
  );
}
