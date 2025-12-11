import { useState } from "react";
import styles from "./ProductRow.module.css";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import ProductFormModal from "../ProductFormModal/ProductFormModal";

function ProductRow({ product, onDelete, onUpdate }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      {/* ردیف محصول */}
      <tr className={styles.row}>
        <td>{product.name}</td>
        <td>{product.price.toLocaleString()} ریال</td>
        <td>{product.quantity}</td>
        <td>
          <button
            className={styles.editBtn}
            onClick={() => setShowEdit(true)}
          >
            ✏️ ویرایش
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => setShowConfirm(true)}
          >
            🗑 حذف
          </button>
        </td>
      </tr>

      {/* مودال ویرایش */}
      <ProductFormModal
        isOpen={showEdit}
        initialData={product}
        onClose={() => setShowEdit(false)}
        onSubmit={(data) => {
          onUpdate(product.id, data);
          setShowEdit(false);
        }}
      />

      {/* دیالوگ تأیید حذف */}
      <ConfirmDialog
        isOpen={showConfirm}
        title="حذف محصول"
        message={`آیا مطمئن هستید که "${product.name}" حذف شود؟`}
        onConfirm={() => {
          onDelete(product.id);
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}

export default ProductRow;
