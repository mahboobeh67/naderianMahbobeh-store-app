import { useForm } from "react-hook-form";
import Modal from "../../components/ui/Modal";
import { useEffect, useState } from "react";
import productService from "../../services/productService";

import { useQueryClient } from "@tanstack/react-query";

function ProductFormModal({ productId, onClose }) {
  const qc = useQueryClient();

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      title: "",
      price: "",
      inventory: "",
      description: "",
      images: [],
    },
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) {
      productService.getOne(productId).then((res) => {
        reset(res.data);
      });
    }
  }, [productId]);

  async function onSubmit(data) {
    setLoading(true);

    data.price = Number(data.price);
    data.inventory = Number(data.inventory);

    if (productId) await productService.update(productId, data);
    else await productService.create(data);

    qc.invalidateQueries(["products"]);
    setLoading(false);
    onClose();
  }

  return (
    <Modal
      onClose={onClose}
      title={productId ? "ویرایش محصول" : "افزودن محصول"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>نام</label>
        <input {...register("title", { required: true, minLength: 2 })} />

        <label>قیمت</label>
        <input
          type="number"
          {...register("price", { required: true, min: 1 })}
        />

        <label>موجودی</label>
        <input
          type="number"
          {...register("inventory", { required: true, min: 0 })}
        />

        <label>توضیحات</label>
        <textarea {...register("description")} />

        <label>تصاویر (URL)</label>
        <input {...register("images")} placeholder='["url1","url2"]' />

        <button disabled={loading}>
          {loading ? "در حال ذخیره..." : "ذخیره"}
        </button>
      </form>
    </Modal>
  );
}

export default ProductFormModal;
