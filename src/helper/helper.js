const shortenText = (text, wordCount = 3) => {
  if (typeof text !== "string" || !text.trim()) return "";
  return text.split(" ").slice(0, wordCount).join(" ");
};

// 🔹 جست‌وجوی محصولات با حساسیت کمتر به حروف بزرگ/کوچک
const searchProduct = (products = [], search = "") => {
  if (!Array.isArray(products) || !search?.trim()) return products;
  const keyword = search.toLowerCase();
  return products.filter((p) => p.title?.toLowerCase().includes(keyword));
};

// 🔹 فیلتر دسته‌بندی محصولات
const filterProduct = (products = [], category = "") => {
  if (!Array.isArray(products) || !category?.trim()) return products;
  return products.filter((p) => p.category === category);
};

// 🔹 ساخت آبجکت کوئری بر اساس تغییرات جدید
const createQueryObject = (currentQuery = {}, newQuery = {}) => {
  const queryCopy = { ...currentQuery };

  if (newQuery.category === "all") delete queryCopy.category;
  else if (newQuery.category) queryCopy.category = newQuery.category;

  if (newQuery.search === "") delete queryCopy.search;
  else if (newQuery.search) queryCopy.search = newQuery.search;

  return queryCopy;
};

// 🔹 گرفتن کوئری اولیه از URLSearchParams
const getInitialQuery = (searchParams) => {
  const query = {};
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  if (category) query.category = category;
  if (search) query.search = search;

  return query;
};

// 🔹 جمع تعداد و مجموع قیمت محصولات انتخابی
const sumProducts = (products = []) => {
  const itemsCounter = products.reduce(
    (count, product) => count + (product.quantity || 0),
    0
  );
  const total = products
    .reduce(
      (sum, product) => sum + (product.price || 0) * (product.quantity || 0),
      0
    )
    .toFixed(2);

  return { itemsCounter, total };
};

// 🔹 استخراج تعداد یک محصول خاص در وضعیت فعلی سبد
const productQuantity = (state, id) => {
  if (!state?.selectedItems?.length) return 0;
  const found = state.selectedItems.find((item) => item.id === id);
  return found?.quantity || 0;
};

// 🔹 خروجی وحدت‌یافته
export {
  shortenText,
  searchProduct,
  filterProduct,
  createQueryObject,
  getInitialQuery,
  sumProducts,
  productQuantity,
};


