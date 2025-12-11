import { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./ProductFormModal.module.css";

function ProductFormModal({ isOpen, onClose, onSubmit, initialData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      name: "",
      price: "",
      quantity: "",
    },
  });

  useEffect(() => {
    reset(initialData || { name: "", price: "", quantity: "" });
  }, [initialData, reset]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{initialData ? "ویرایش محصول" : "افزودن محصول جدید"}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formGroup}>
            <label>نام محصول</label>
            <input
              {...register("name", { required: "نام محصول الزامی است" })}
              placeholder="نام محصول..."
            />
            {errors.name && <span className={styles.error}>{errors.name.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>قیمت</label>
            <input
              type="number"
              {...register("price", { required: "قیمت الزامی است" })}
              placeholder="قیمت به ریال..."
            />
            {errors.price && <span className={styles.error}>{errors.price.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label>تعداد موجودی</label>
            <input
              type="number"
              {...register("quantity", { required: "تعداد الزامی است" })}
              placeholder="تعداد موجود..."
            />
            {errors.quantity && (
              <span className={styles.error}>{errors.quantity.message}</span>
            )}
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancel} onClick={onClose}>
              انصراف
            </button>
            <button type="submit" className={styles.submit}>
              ثبت
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductFormModal;
