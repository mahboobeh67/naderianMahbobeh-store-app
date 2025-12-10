import { useForm } from "react-hook-form";
import Modal from "../../components/ui/Modal";
import { useEffect, useState } from "react";
import productService from "../../services/productService";
import { useQueryClient } from "@tanstack/react-query";

function ProductFormModal({ productId, onClose }) {
  const qc = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [loadingProduct, setLoadingProduct] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      price: "",
      inventory: "",
      description: "",
      images: "",
    },
  });

  // Load product if editing
  useEffect(() => {
    if (!productId) return;

    async function fetchProduct() {
      try {
        setLoadingProduct(true);
        const res = await productService.getOne(productId);

        const product = res.data;

        reset({
          title: product.title || "",
          price: product.price || "",
          inventory: product.inventory || "",
          description: product.description || "",
          images: JSON.stringify(product.images || []),
        });
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setLoadingProduct(false);
      }
    }

    fetchProduct();
  }, [productId, reset]);

  async function onSubmit(formData) {
    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        inventory: Number(formData.inventory),
        images: safeParseImages(formData.images),
      };

      if (productId) {
        await productService.update(productId, payload);
      } else {
        await productService.create(payload);
      }

      qc.invalidateQueries({ queryKey: ["products"] });

      onClose();
      reset();

    } catch (err) {
      console.error("Save product error:", err);
      alert("خطا در ذخیره محصول!");
    } finally {
      setLoading(false);
    }
  }

  function safeParseImages(str) {
    try {
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  const isDisabled = loading || loadingProduct;

  return (
    <Modal
      onClose={onClose}
      title={productId ? "ویرایش محصول" : "افزودن محصول"}
    >
      {loadingProduct ? (
        <p>در حال بارگذاری محصول...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>

          <label htmlFor="title">نام</label>
          <input
            id="title"
            disabled={isDisabled}
            {...register("title", { required: "نام الزامی است", minLength: 2 })}
          />
          {errors.title && <span>{errors.title.message}</span>}

          <label htmlFor="price">قیمت</label>
          <input
            id="price"
            type="number"
            disabled={isDisabled}
            {...register("price", { required: "قیمت الزامی است", min: 1 })}
          />
          {errors.price && <span>{errors.price.message}</span>}

          <label htmlFor="inventory">موجودی</label>
          <input
            id="inventory"
            type="number"
            disabled={isDisabled}
            {...register("inventory", { required: "موجودی الزامی است", min: 0 })}
          />
          {errors.inventory && <span>{errors.inventory.message}</span>}

          <label htmlFor="description">توضیحات</label>
          <textarea
            id="description"
            disabled={isDisabled}
            {...register("description")}
          />

          <label htmlFor="images">تصاویر (JSON)</label>
          <input
            id="images"
            disabled={isDisabled}
            {...register("images")}
            placeholder='["url1","url2"]'
          />

          <button disabled={isDisabled}>
            {loading ? "در حال ذخیره..." : productId ? "ذخیره تغییرات" : "افزودن محصول"}
          </button>
        </form>
      )}
    </Modal>
  );
}

export default ProductFormModal;
