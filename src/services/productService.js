import { useQuery } from "@tanstack/react-query";
import productService from "../services/productService";


function useProducts(params) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => productService.getList(params),
    keepPreviousData: true,
  });
}

export default useProducts;
