import { useState } from "react";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import ProductFormModal from "./ProductFormModal";
import productService from "../../services/productService";

import { useQueryClient } from "@tanstack/react-query";

function ProductRow({ product }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const qc = useQueryClient();

  async function handleDelete() {
    await productService.delete(product.id);
    qc.invalidateQueries(["products"]);
  }

  return (
    <tr>
      <td>{product.title}</td>
      <td>{product.price.toLocaleString()}</td>
      <td>{product.inventory}</td>
      <td>{product.id}</td>
      <td>
        <button onClick={() => setShowEdit(true)}>ویرایش</button>
        <button onClick={() => setShowConfirm(true)}>حذف</button>
      </td>

      {showEdit && (
        <ProductFormModal
          productId={product.id}
          onClose={() => setShowEdit(false)}
        />
      )}

      {showConfirm && (
        <ConfirmDialog
          message={`حذف محصول "${product.title}"؟`}
          onCancel={() => setShowConfirm(false)}
          onConfirm={handleDelete}
        />
      )}
    </tr>
  );
}

export default ProductRow;
