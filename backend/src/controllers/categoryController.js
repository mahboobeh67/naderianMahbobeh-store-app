let categories = [
  { id: 1, title: "موبایل", icon: "📱" },
  { id: 2, title: "لباس", icon: "👕" },
];

export async function getAllCategories(req, res) {
  res.json(categories);
}

export async function getCategory(req, res) {
  const id = Number(req.params.id);
  const item = categories.find(c => c.id === id);

  if (!item) return res.status(404).json({ error: "Category not found" });

  res.json(item);
}

export async function createCategory(req, res) {
  const newItem = {
    id: Date.now(),
    ...req.body,
  };
  categories.push(newItem);
  res.status(201).json(newItem);
}

export async function updateCategory(req, res) {
  const id = Number(req.params.id);
  const index = categories.findIndex(c => c.id === id);

  if (index === -1) return res.status(404).json({ error: "Not found" });

  categories[index] = { ...categories[index], ...req.body };
  res.json(categories[index]);
}

export async function deleteCategory(req, res) {
  const id = Number(req.params.id);
  categories = categories.filter(c => c.id !== id);
  res.json({ success: true });
}
