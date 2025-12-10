import styles from "./ProductTable.module.css";
import { useProducts } from "@/hooks";
import { useState } from "react";

export default function ProductTable() {
  const [sort, setSort] = useState({ field: "price", direction: "asc" });

  const { data, isLoading, error } = useProducts({
    sortField: sort.field,
    sortDir: sort.direction,
  });

  function toggleSort(field) {
    setSort((prev) =>
      prev.field === field
        ? { field, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { field, direction: "asc" }
    );
  }

  if (error) return <p className={styles.error}>خطا در بارگذاری جدول!</p>;

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => toggleSort("name")}>
              نام محصول
              {sort.field === "name" && (sort.direction === "asc" ? " 🔼" : " 🔽")}
            </th>
            <th onClick={() => toggleSort("price")}>
              قیمت
              {sort.field === "price" && (sort.direction === "asc" ? " 🔼" : " 🔽")}
            </th>
            <th>موجودی</th>
            <th>عملیات</th>
          </tr>
        </thead>

        <tbody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className={styles.skeletonRow}>
                  <td colSpan="4" />
                </tr>
              ))
            : data?.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.price.toLocaleString()} تومان</td>
                  <td>{item.inventory}</td>

                  <td>
                    <button className={styles.editBtn}>ویرایش</button>
                    <button className={styles.deleteBtn}>حذف</button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

