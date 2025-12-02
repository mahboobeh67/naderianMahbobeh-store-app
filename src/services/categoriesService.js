import { fetchCategories } from "../api/categoriesApi";
import { mapCategories } from "../layout/CategoryBar/mappers/categoriesMapper";

export async function getCategories() {
  const raw = await fetchCategories();   // فقط fetch
  return mapCategories(raw);             // تمیز کردن داده
}
