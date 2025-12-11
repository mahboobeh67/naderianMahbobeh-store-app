import { useQuery } from "@tanstack/react-query";
import categoryService from "@/services/categoryService";
import CategoryCard from "./CategoryCard";

export default function CategoryBar() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await categoryService.getAll();
      return res.items ?? [];
    },
  });

  if (isLoading) return <p>در حال بارگذاری دسته‌ها...</p>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 p-4">
      {categories.map((cat) => (
        <CategoryCard
          key={cat.id}
          id={cat.id}
          title={cat.title}
          imageUrl={cat.imageUrl}
        />
      ))}
    </div>
  );
}



