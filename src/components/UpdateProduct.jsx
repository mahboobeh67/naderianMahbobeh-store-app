import { useState, useEffect } from "react";
import styles from "./UpdateProduct.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import { showToast } from "@/utils/toast";

export default function UpdateProduct({ productId, onClose }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    imageUrl: "",
  });

  // ---- Fetch Product Data ----
  const productQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/products/${productId}`);
      if (!res.ok) throw new Error("خطا در دریافت محصول!");
      return res.json();
    },
  });

  // Fill form when data arrives
  useEffect(() => {
    if (productQuery.data) {
      const p = productQuery.data;
      setForm({
        name: p.name,
        price: p.price,
        description: p.description,
        category: p.category,
        imageUrl: p.imageUrl,
      });
    }
  }, [productQuery.data]);

  // ---- Update Mutation ----
  const updateMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`http://localhost:3001/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("آپدیت محصول انجام نشد!");
    },

    onSuccess: () => {
      showToast("محصول با موفقیت ویرایش شد!", "success");
      onClose?.();
    },

    onError: () => {
      showToast("خطا در ویرایش محصول!", "error");
    },
  });

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  if (productQuery.isLoading) return <p className={styles.loading}>در حال بارگذاری...</p>;
  if (productQuery.error) return <p className={styles.error}>خطا در دریافت محصول!</p>;

  return (
    <div className={styles.wrapper}>
      <h2>ویرایش محصول</h2>

      <div className={styles.formGroup}>
        <label>نام محصول</label>
        <input name="name" value={form.name} onChange={handleChange} />
      </div>

      <div className={styles.formGroup}>
        <label>قیمت</label>
        <input name="price" value={form.price} onChange={handleChange} />
      </div>

      <div className={styles.formGroup}>
        <label>توضیحات</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label>دسته‌بندی</label>
        <input name="category" value={form.category} onChange={handleChange} />
      </div>

      <div className={styles.formGroup}>
        <label>آدرس تصویر</label>
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
      </div>

      <button
        className={styles.updateBtn}
        onClick={() => updateMutation.mutate()}
        disabled={updateMutation.isPending}
      >
        {updateMutation.isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </button>
    </div>
  );
}
