import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import Card from "../../components/Card";
import Loading from "../../components/ui/Loading";
import SearchBox from "../../layout/header/SearchBox";
import { useProduct } from "../../context/ProductContext";
import {
  filterProduct,
  getInitialQuery,
  searchProduct,
} from "../../helper/helper";
import styles from "./ProductPage.module.css";
import Sidebar from "../../layout/Sidebar";

function ProductPage() {
  const { products, loading, error } = useProduct();

  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(getInitialQuery(searchParams));

  // ---------------------------------------------
  // Keep URL synced with query
  // ---------------------------------------------
  useEffect(() => {
    setSearchParams(query);
  }, [query]);

  // ---------------------------------------------
  // Filtering logic (memoized)
  // ---------------------------------------------
  const displayed = useMemo(() => {
    if (!products || loading) return [];

    let filtered = searchProduct(products, query.search);
    filtered = filterProduct(filtered, query.category);

    return filtered;
  }, [products, query, loading]);

  // ---------------------------------------------
  // Error State
  // ---------------------------------------------
  if (error) {
    return <div className={styles.error}>خطا در دریافت محصولات</div>;
  }

  return (
    <>
      <SearchBox
        search={query.search || ""}
        setSearch={(value) => setQuery((q) => ({ ...q, search: value }))}
        setQuery={setQuery}
      />

      <div className={styles.container}>
        <div className={styles.product}>
          {loading ? (
            <Loading />
          ) : displayed.length === 0 ? (
            <div className={styles.noResult}>نتیجه‌ای یافت نشد</div>
          ) : (
            displayed.map((p) => <Card key={p.id || p._id} data={p} />)
          )}
        </div>

        <Sidebar query={query} setQuery={setQuery} />
      </div>
    </>
  );
}

export default ProductPage;

