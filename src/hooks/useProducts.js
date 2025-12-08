// src/hooks/useProducts.js
import { useQuery } from "@tanstack/react-query";
import productService from "@/services/productService";
import { mapProductList } from "@/mappers/productMapper";

export function useProducts(params) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const res = await productService.getList(params);
      return mapProductList(res);
    },
    keepPreviousData: true,
  });
}
