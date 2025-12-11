import { useState } from "react";

export default function CategoryFormModal({ initialData, onSave, onClose }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, imageUrl });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-[400px] space-y-4">
        <h3 className="text-lg font-bold">
          {initialData ? "ویرایش دسته" : "افزودن دسته جدید"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1">عنوان دسته</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border w-full px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">آدرس تصویر</label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="border w-full px-3 py-2 rounded"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
            >
              انصراف
            </button>

            <button className="px-4 py-2 bg-[#005c55] text-white rounded">
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}