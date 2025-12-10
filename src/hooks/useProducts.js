import { useQuery } from "@tanstack/react-query";
import productService from "@/services/productService";


export default function useProducts({
  page = 1,
  limit = 10,
  search = "",
  sort = null,
  filters = {},     // { categoryId: 1, brands: [1,2], price: [10,50] }
}) {
  const params = {
    page,
    limit,
    search,
    sort,
    ...filters,
  };

  return useQuery({
    queryKey: ["products", params],

    queryFn: async () => {
      // productService.getList → apiClient.get("/products", { params })
      const response = await productService.getList(params);


      return {
        items: response.items || [],
        meta: response.meta || {
          total: 0,
          totalPages: 1,
          page,
          limit,
        },
      };
    },

    keepPreviousData: true,   // prevents UI flickering during pagination
    staleTime: 1000 * 60 * 2, // items stay fresh for 2 minutes
    refetchOnWindowFocus: false,
    retry: 1,                 // retry only once on network error
  });
}
