import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/categoriesService";

export default function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,

    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,

    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
}

