import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/categoryService";

export default function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}



