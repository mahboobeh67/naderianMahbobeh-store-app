export async function fetchCategories() {
  const res = await fetch("http://localhost:3000/categories");
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json(); // raw data
}