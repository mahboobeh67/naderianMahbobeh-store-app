import { useState } from "react";
import styles from "./DeleteProduct.module.css";
import { FaTrash } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/utils/toast";

export default function DeleteProduct({ productId }) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const queryClient = useQueryClient();

  // --- DELETE API ---
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`http://localhost:3001/api/products/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("خطا در حذف محصول!");
    },

    onSuccess: () => {
      showToast("محصول با موفقیت حذف شد.", "success");
      queryClient.invalidateQueries(["products"]);
      setOpenConfirm(false);
    },

    onError: () => {
      showToast("حذف محصول انجام نشد!", "error");
    },
  });

  return (
    <>
      <button
        className={styles.deleteBtn}
        onClick={() => setOpenConfirm(true)}
        disabled={deleteMutation.isPending}
      >
        <FaTrash className={styles.icon} />
        حذف
      </button>

      {openConfirm && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h3>حذف محصول</h3>
            <p>آیا از حذف این محصول مطمئن هستید؟</p>

            <div className={styles.actions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setOpenConfirm(false)}
              >
                انصراف
              </button>

              <button
                className={styles.confirmBtn}
                onClick={() => deleteMutation.mutate()}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "در حال حذف..." : "تأیید حذف"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
