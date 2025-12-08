import { useState } from "react";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import ProductFormModal from "./ProductFormModal";
import productService from "../../services/productService";
import { useQueryClient } from "@tanstack/react-query";

import styles from "./ProductRow.module.css";

function ProductRow({ product }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const qc = useQueryClient();

  async function handleDelete() {
    await productService.delete(product.id);
    qc.invalidateQueries(["products"]);
    setShowConfirm(false);
  }

  return (
    <>
      <tr className={styles.row}>
        <td>{product.title}</td>
        <td>{product.price.toLocaleString()}</td>
        <td className={product.inventory > 0 ? styles.inStock : styles.outStock}>
          {product.inventory}
        </td>
        <td>{product.id}</td>

        <td className={styles.actions}>
          <button
            className={styles.editBtn}
            onClick={() => setShowEdit(true)}
          >
            ویرایش
          </button>

          <button
            className={styles.deleteBtn}
            onClick={() => setShowConfirm(true)}
          >
            حذف
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
        />
      )}
    </>
  );
}

export default ProductRow;
