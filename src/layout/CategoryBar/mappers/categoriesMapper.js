export function mapCategory(item) {
  return {
    id: item._id,
    title: item.title_fa,
    icon: item.icon_url,
    // ⚠️ فقط چیزهایی که UI لازم دارد
  };
}

export function mapCategories(list) {
  if (!Array.isArray(list)) return [];
  return list.map(mapCategory);
}
