import { API_CONFIG, apiUrl } from "@/config";

const PRODUCTS_URL = API_CONFIG.ENDPOINTS.PRODUCTS;

export async function fetchProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = apiUrl(`${PRODUCTS_URL}?${query}`);

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

export default fetchProducts;

