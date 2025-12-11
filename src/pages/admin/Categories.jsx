import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import categoryService from "@/services/categoryService";
import CategoryFormModal from "./CategoryFormModal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

export default function Categories() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);

  const { data: categories = [], isLoading, error, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAll(),
  });

  const handleSave = async (payload) => {
    if (editingCategory) {
      await categoryService.update(editingCategory.id, payload);
    } else {
      await categoryService.create(payload);
    }
    refetch();
    setModalOpen(false);
    setEditingCategory(null);
  };

  const handleDelete = async () => {
    await categoryService.delete(deletingCategory.id);
    refetch();
    setDeletingCategory(null);
  };

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (error) return <p>خطا در دریافت دسته‌ها!</p>;

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">مدیریت دسته‌بندی‌ها</h2>

        <button
          className="bg-[#005c55] text-white px-4 py-2 rounded"
          onClick={() => {
            setEditingCategory(null);
            setModalOpen(true);
          }}
        >
          + دسته جدید
        </button>
      </div>

      <div className="space-y-2">
        {categories.map((c) => (
          <div
            key={c.id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <span>{c.title}</span>

            <div className="flex gap-3">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() => {
                  setEditingCategory(c);
                  setModalOpen(true);
                }}
              >
                ویرایش
              </button>

              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() => setDeletingCategory(c)}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <CategoryFormModal
          initialData={editingCategory}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}

      {deletingCategory && (
        <ConfirmDialog
          title="حذف دسته"
          message={`"${deletingCategory.title}" حذف شود؟`}
          onConfirm={handleDelete}
          onCancel={() => setDeletingCategory(null)}
        />
      )}
    </div>
  );
}
