import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/categoryService";

export default function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await categoryService.getAll();
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });
}



