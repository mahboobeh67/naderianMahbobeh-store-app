import  { useEffect, useReducer } from "react";
import styles from "./ManageProductPage.module.css";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import  useProducts  from "@/hooks/useProducts";
import ProductTable from "@/components/ui/ProductTable";
import ProductFormModal from "@/components/ui/ProductFormModal";
import { useToastContext } from "@/context/ToastContext";
import { initialState, reducer } from "./manageProduct.reducer";

export default function ManageProductPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { showToast } = useToastContext();

  const {
    page,
    limit,
    search,
    debouncedSearch,
    isModalOpen,
    modalMode,
    selectedProduct,
  } = state;

  // Debounce search
  const debouncedValue = useDebouncedValue(search, 500);

  useEffect(() => {
    dispatch({ type: "SET_DEBOUNCED_SEARCH", payload: debouncedValue });
  }, [debouncedValue]);

  // Fetch Products
  const { data, isLoading, isError, error } = useProducts({
    page,
    limit,
    search: debouncedSearch,
  });

  // Toast error handler
  useEffect(() => {
    if (isError && error?.message) {
      showToast(error.message, "error", "top-right");
    }
  }, [isError]);

  return (
    <div className={styles.wrapper}>

      {/* HEADER */}
      <header className={styles.header}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="جستجوی محصول..."
          value={search}
          onChange={(e) =>
            dispatch({ type: "SET_SEARCH", payload: e.target.value })
          }
        />

        <button
          className={styles.addBtn}
          onClick={() => dispatch({ type: "OPEN_CREATE_MODAL" })}
        >
          + افزودن محصول
        </button>
      </header>

      {/* TABLE */}
      <ProductTable
        products={data?.items || []}
        isLoading={isLoading}
        page={page}
        totalPages={data?.meta?.totalPages || 1}
        onPageChange={(p) => {
          dispatch({ type: "SET_PAGE", payload: p });
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onEdit={(product) =>
          dispatch({ type: "OPEN_EDIT_MODAL", payload: product })
        }
      />

      {/* MODAL */}
      <ProductFormModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialValues={selectedProduct}
        onClose={() => dispatch({ type: "CLOSE_MODAL" })}
      />
    </div>
  );
}
