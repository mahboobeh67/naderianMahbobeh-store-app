import { useProducts} from "@/hooks"
import Pagination from "../../components/ui/Pagination"
import { useState } from "react"
import AddProduct from "../../components/AddProduct"
import Modal from "../../components/ui/Modal"
import ProductTable from "../../components/ui/ProductTable"
import ProductList from "../../components/ProductListPage"

export default function Homepage() {


  const [page, setPage] = useState(1)
  const [openModal, setOpenModal] = useState(false)

  // IMPORTANT: pass page to useProducts
  const {
    products = [],
    meta,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts({ page })

  return (
    <div>
      <main style={{ padding: "20px" }}>
        <h1>به صفحه اصلی خوش اومدی! 🚀</h1>
        
        {productsLoading && <p>در حال بارگذاری محصولات...</p>}
        {productsError && <p>خطا در دریافت محصولات!</p>}

        {/* Product List from hook */}
        <ProductList products={products} loading={productsLoading} />

        {/* Add Product Button */}
        <AddProduct openModal={openModal} setOpenModal={setOpenModal} />

        {/* Modal for adding product */}
        {openModal && (
          <Modal closeModal={() => setOpenModal(false)} />
        )}

        {/* Admin Product Table */}
        <ProductTable products={products} loading={productsLoading} />
      </main>

      {/* Pagination connected to hook meta */}
      <Pagination
        page={meta?.page ?? page}
        setPage={setPage}
        hasMore={meta?.hasMore}
      />
    </div>
  )
}
