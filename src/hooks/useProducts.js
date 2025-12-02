import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/productService";

export default function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 30000,
    retry: 2,
  });
}

