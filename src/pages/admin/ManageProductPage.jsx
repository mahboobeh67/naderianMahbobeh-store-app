import { useState } from "react";
import Pagination from "../../components/ui/Pagination";
import ProductTable from "./ProductTable";
import ProductFormModal from "./ProductFormModal";
import { useDebouncedValue } from "../../../hook/useDebouncedValue";
import useProducts from "../../../hook/useProducts";  // ✔✔✔ درست همین است
import SearchInput from "../../components/ui/SearchInput";
function ManageProductPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const debounced = useDebouncedValue(search, 300);

  const { data, isLoading, isError, refetch } = useProducts({
    page,
    limit: 10,
    search: debounced,
    sort: "createdAt_desc"
  });

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />

        <button onClick={() => setShowModal(true)}>افزودن محصول</button>
      </header>

      <ProductTable
        products={data?.data || []}
        loading={isLoading}
        error={isError}
        onRetry={refetch}
      />

      <Pagination
        page={data?.meta.page}
        total={data?.meta.total}
        limit={10}
        onPageChange={setPage}
      />

      {showModal && <ProductFormModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default ManageProductPage;
