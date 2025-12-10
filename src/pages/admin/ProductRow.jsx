import { useState } from "react";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import ProductFormModal from "./ProductFormModal";
import productService from "../../services/productService";
import { useQueryClient } from "@tanstack/react-query";

import { useToastContext } from "@/context/ToastContext";

import styles from "./ProductRow.module.css";

function ProductRow({ product }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const qc = useQueryClient();
  const { showToast } = useToastContext();

  async function handleDelete() {
    try {
      setDeleting(true);

      await productService.delete(product.id);

      qc.invalidateQueries({ queryKey: ["products"] });

      showToast({
        message: `محصول «${product.title}» با موفقیت حذف شد.`,
        type: "success",
        position: "bottom-right",
      });

      setShowConfirm(false);

    } catch (err) {
      console.error("Delete error:", err);

      showToast({
        message: "خطا در حذف محصول! لطفا دوباره تلاش کنید.",
        type: "error",
        position: "bottom-right",
      });

    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <tr className={styles.row}>
        <td className={styles.colTitle}>{product.title}</td>

        <td className={styles.colPrice}>
          {product.price.toLocaleString()} تومان
        </td>

        <td
          className={
            product.inventory > 0 ? styles.inStock : styles.outStock
          }
        >
          {product.inventory}
        </td>

        <td className={styles.colId}>{product.id}</td>

        <td className={styles.actions}>
          <button
            className={styles.editBtn}
            onClick={() => setShowEdit(true)}
            disabled={deleting}
          >
            ویرایش
          </button>

          <button
            className={styles.deleteBtn}
            onClick={() => setShowConfirm(true)}
            disabled={deleting}
          >
            {deleting ? "حذف..." : "حذف"}
          </button>
        </td>
      </tr>

      {showEdit && (
        <ProductFormModal
          productId={product.id}
          onClose={() => setShowEdit(false)}
        />
      )}

      {showConfirm && (
        <ConfirmDialog
          message={`حذف محصول «${product.title}»؟`}
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleDelete}
          loading={deleting}
        />
      )}
    </>
  );
}

export default ProductRow;

