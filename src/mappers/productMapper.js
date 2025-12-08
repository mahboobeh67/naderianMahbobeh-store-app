// src/mappers/productMapper.js
export const mapProduct = (item) => ({
  id: item.id,
  name: item.name,
  price: item.price,
});

export const mapProductList = (response) => ({
  items: response.data.map(mapProduct),
  page: response.page,
  limit: response.limit,
  totalPages: response.totalPages,
  total: response.totalProducts,
});
