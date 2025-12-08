import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Card from "../../components/Card";
import Loading from "../../components/ui/Loading";
import SearchBox from "../../layout/header/SearchBox";
import { useProduct } from "../../context/ProductContext";
import {  filterProduct, getInitialQuery, searchProduct } from "../../helper/helper";
import styles from "./ProductPage.module.css";
import Sidebar from "../../layout/Sidebar"

function ProductPage() {
  const products = useProduct();
  const [displayed, setDisplayed] = useState([]);
  const [query, setQuery] = useState({});
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const initialQuery = getInitialQuery(searchParams);
    setQuery(initialQuery);
  }, [products]);

  useEffect(() => {
    setSearchParams(query);
    setSearch(query.search || "");
    let filtered = searchProduct(products, query.search);
    filtered = filterProduct(filtered, query.category);
    setDisplayed(filtered);
  }, [query, products]);


  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      <div className={styles.container}>
        <div className={styles.product}>
          {!displayed.length ? (
            <Loading />
          ) : (
            displayed.map((p) => <Card key={p.id || p._id} data={p} />)
          )}
        </div>
       <Sidebar query={query} setQuery={setQuery}/>
      </div>
    </>
  );
}

export default ProductPage;
