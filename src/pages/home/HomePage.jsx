import { useProducts, useCategories } from "@/hooks";

import Pagination from "../../components/ui/Pagination";
import { useState } from "react";
import AddProduct from "../../components/AddProduct";
import Modal from "../../components/ui/Modal";
import ProductTable from "../../components/ui/ProductTable";
import Card from "../../components/Card";
import ProductList from "../../components/ProductListPage";
export default function Homepage() {
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  const {
    products = [],
    isLoading: productsLoading,
    error: productsError,
  } = useProducts();
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <main style={{ padding: "20px" }}>
        <h1>به صفحه اصلی خوش اومدی! 🚀</h1>

        {productsLoading && <p>در حال بارگذاری محصولات...</p>}
        {productsError && <p>خطا در دریافت محصولات!</p>}

        <div>
          {products.map((p) => (
            <div key={p.id}>{p.title}</div>
          ))}
        </div>
       <ProductList />
        <AddProduct openModal={openModal} setOpenModal={setOpenModal} />
        {openModal && (
          <Modal  closeModal={setOpenModal} />
        )}
        <ProductTable />
      </main>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
}
