import { useQuery } from "@tanstack/react-query";
import  categoryService  from "@/services/categoryService";

 function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.getAll(),
  });
}

export default useCategories
