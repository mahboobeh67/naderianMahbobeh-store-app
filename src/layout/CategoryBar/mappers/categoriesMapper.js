/**
 * @typedef {object} RawCategory
 * @property {string} _id - The unique identifier from the backend.
 * @property {string} title_fa - The Persian title of the category.
 * @property {string} [icon_url] - Optional URL for the category icon.
 * @property {any} [other_fields] - Any other fields that the backend might send but UI doesn't need.
 */

/**
 * @typedef {object} MappedCategory
 * @property {string} id - The cleaned and UI-ready unique identifier.
 * @property {string} title - The cleaned and UI-ready Persian title.
 * @property {string} icon - The cleaned and UI-ready icon URL, or an empty string if not provided.
 */

/**
 * Maps a single raw category object from the API to a UI-friendly format.
 * Ensures null-safety and provides default values.
 *
 * @param {RawCategory | null | undefined} rawCategory - The raw category object from the API.
 * @returns {MappedCategory} The mapped category object.
 */
export function mapCategory(rawCategory) {
  // اگر rawCategory خودش null یا undefined بود، یک شیء پیش‌فرض برمی‌گردانیم تا خطا ندهد.
  if (!rawCategory) {
    return {
      id: "unknown-category", // یک ID پیش‌فرض برای تشخیص مشکلات
      title: "دسته ناشناس",
      icon: "",
    };
  }

  return {
    id: rawCategory._id ?? `category-${Date.now()}`, // اگر _id نبود، یک ID موقت می‌سازیم
    title: rawCategory.title_fa ?? "بدون عنوان", // اگر عنوان فارسی نبود، "بدون عنوان"
    icon: rawCategory.icon_url ?? "", // اگر آیکون نبود، رشته خالی
  };
}

/**
 * Maps an array of raw category objects from the API to an array of UI-friendly formats.
 * Handles non-array inputs gracefully.
 *
 * @param {Array<RawCategory> | null | undefined} rawCategoryList - The array of raw category objects.
 * @returns {Array<MappedCategory>} The array of mapped category objects.
 */
export function mapCategories(rawCategoryList) {
  // اگر ورودی null یا undefined یا آرایه نبود، یک آرایه خالی برمی‌گردانیم.
  if (!Array.isArray(rawCategoryList)) {
    console.warn("mapCategories received non-array input:", rawCategoryList); // برای دیباگ بهتر
    return [];
  }
  return rawCategoryList.map(mapCategory);
}

