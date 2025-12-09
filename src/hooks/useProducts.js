import { useQuery } from "@tanstack/react-query";
import productService from "@/services/productService";   

export default function useProducts(params) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productService.getList(params), 
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true, 
  });
}
