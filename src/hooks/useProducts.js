import { useQuery } from "@tanstack/react-query";
import productService from "@/services/productService";

export default function useProducts({
  page = 1,
  limit = 10,
  search = "",
  sort = null,
  minPrice = null,
  maxPrice = null,
}) {
  const params = {
    page,
    limit,
    search,
    sort,
    minPrice,
    maxPrice,
  };

  return useQuery({
    queryKey: ["products", params],

    queryFn: async () => {
      const res = await productService.getList(params);

      return {
        items: res.data || [],
        meta: {
          total: res.totalProducts,
          totalPages: res.totalPages,
          page: res.page,
          limit: res.limit,
          hasMore: res.page < res.totalPages,
        },
      };
    },

    keepPreviousData: true,
    staleTime: 1000 * 60 * 2,
    refetchOnWindowFocus: false,
    retry: 1,
  });
}
