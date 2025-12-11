// src/pages/ProductPage/ProductPage.jsx
import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import Card from "../../components/Card";
import Loading from "../../components/ui/Loading";
import SearchBox from "../../layout/header/SearchBox";
import Sidebar from "../../layout/Sidebar";

import { useProducts } from "../../context/ProductContext";

import {
  filterProduct,
  getInitialQuery,
  searchProduct,
} from "../../helper/helper";

import styles from "./ProductPage.module.css";

function ProductPage() {
  const {
    products,
    isLoading,
    isRefetching,
    error,
    invalidateProducts,
  } = useProducts();

  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState(getInitialQuery(searchParams));


  // ---------------------------------------------
  // Sync URL with query state (always in sync)
  // ---------------------------------------------
  useEffect(() => {
    setSearchParams(query);
  }, [query, setSearchParams]);


  // ---------------------------------------------
  // Memoized Filtering Logic
  // ---------------------------------------------
  const displayed = useMemo(() => {
    if (!products || isLoading) return [];

    let filtered = searchProduct(products, query.search);
    filtered = filterProduct(filtered, query.category);

    return filtered;
  }, [products, query, isLoading]);


  // ---------------------------------------------
  // Handler: Reset filters (enterprise-ready)
  // ---------------------------------------------
  const handleResetFilters = useCallback(() => {
    setQuery({ search: "", category: "all" });

    // و همینجا لیست را از نو Fetch می‌کنیم
    invalidateProducts();
  }, [setQuery, invalidateProducts]);


  // ---------------------------------------------
  // Render Error State
  // ---------------------------------------------
  if (error) {
    return (
      <div className={styles.error}>
        خطا در دریافت محصولات
        <button onClick={invalidateProducts} className={styles.retryBtn}>
          تلاش مجدد
        </button>
      </div>
    );
  }


  // ---------------------------------------------
  // Render Page
  // ---------------------------------------------
  return (
    <>
      <SearchBox
        search={query.search || ""}
        setSearch={(value) => setQuery((q) => ({ ...q, search: value }))}
        setQuery={setQuery}
      />

      <div className={styles.container}>

        {/* PRODUCT LIST */}
        <div className={styles.product}>
          {isLoading && products.length === 0 ? (
            <Loading />
          ) : displayed.length === 0 ? (
            <div className={styles.noResult}>
              نتیجه‌ای یافت نشد
              <button onClick={handleResetFilters} className={styles.resetBtn}>
                بازنشانی جستجو
              </button>
            </div>
          ) : (
            displayed.map((p) => <Card key={p.id || p._id} data={p} />)
          )}

          {/* Refetching Indicator */}
          {isRefetching && (
            <div className={styles.refetching}>
              به‌روزرسانی نتایج...
            </div>
          )}
        </div>


        {/* SIDEBAR */}
        <Sidebar query={query} setQuery={setQuery} />
      </div>
    </>
  );
}

export default ProductPage;


