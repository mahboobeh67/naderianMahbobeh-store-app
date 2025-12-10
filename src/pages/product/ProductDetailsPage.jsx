
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import productService from "@/services/productService";
import styles from "./ProductDetailsPage.module.css";

function ProductDetailsPage() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productService.getOne(id),
  });

  // ======================================================
  // ⭐ Loading State – Skeleton
  // ======================================================
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.skeletonImage}></div>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>
      </div>
    );
  }

  // ======================================================
  // ❗ Error State
  // ======================================================
  if (isError) {
    return (
      <div className={styles.errorBox}>
        خطا در دریافت محصول  
        <br />
        {error.message}
      </div>
    );
  }

  // ======================================================
  // ❗ Not Found
  // ======================================================
  if (!product) {
    return <div className={styles.notFound}>محصول پیدا نشد</div>;
  }

  const images = Array.isArray(product.images)
    ? product.images
    : (() => {
        try {
          return JSON.parse(product.images || "[]");
        } catch {
          return [];
        }
      })();

  return (
    <div className={styles.container}>
      {/* Product Image */}
      <div className={styles.imageWrapper}>
        {images.length > 0 ? (
          <img src={images[0]} alt={product.title} className={styles.image} />
        ) : (
          <div className={styles.noImage}>بدون تصویر</div>
        )}
      </div>

      {/* Product Info */}
      <div className={styles.info}>
        <h1 className={styles.title}>{product.title}</h1>

        <p className={styles.price}>
          {product.price?.toLocaleString("fa-IR")} تومان
        </p>

        <p className={styles.category}>
          دسته: <span>{product.category?.name || "نامشخص"}</span>
        </p>

        <p className={styles.brand}>
          برند: <span>{product.brand || "ندارد"}</span>
        </p>

        <p className={styles.stock}>
          موجودی:{" "}
          <span className={product.stock > 0 ? styles.inStock : styles.outOfStock}>
            {product.stock > 0 ? "موجود" : "ناموجود"}
          </span>
        </p>

        <p className={styles.description}>
          {product.description || "توضیحات موجود نیست."}
        </p>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
