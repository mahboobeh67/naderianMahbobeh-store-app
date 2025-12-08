import { useEffect, useState } from "react";
import Pagination from "../../components/ui/Pagination";
import ProductTable from "./ProductTable";
import ProductFormModal from "./ProductFormModal";
import { useDebouncedValue } from "../../../hook/useDebouncedValue";
import useProducts from "../../../hook/useProducts";
import SearchInput from "../../components/ui/SearchInput";

function ManageProductPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  // Debounce search for 300ms
  const debouncedSearch = useDebouncedValue(search, 300);

  // Reset page when search changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  // Fetch products
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useProducts({
    page,
    limit: 10,
    search: debouncedSearch,
    sort: "createdAt_desc",
  });

  const items = data?.items || [];
  const meta = data?.meta || { total: 0, page: 1, pageSize: 10 };

  return (
    <div>
      {/* Header & Search */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
          alignItems: "center"
        }}
      >
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => setShowModal(true)}
          style={{
            padding: "8px 12px",
            background: "#0b8fde",
            border: "none",
            color: "#fff",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          افزودن محصول
        </button>
      </header>

      {/* Product Table */}
      <ProductTable
        products={items}
        loading={isLoading}
        error={isError}
        onRetry={refetch}
      />

      {/* Pagination */}
      <Pagination
        page={meta.page}
        total={meta.total}
        limit={meta.pageSize || 10}
        onPageChange={setPage}
      />

      {/* Product Modal */}
      {showModal && (
        <ProductFormModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}

export default ManageProductPage;
