export async function fetchCategories() {
  const res = await fetch("/api/categories", {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}