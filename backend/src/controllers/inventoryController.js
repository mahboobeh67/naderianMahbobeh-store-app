let inventory = [
  { id: 1, productId: 101, stock: 20 },
  { id: 2, productId: 102, stock: 50 },
];

export const getAllInventory = (req, res) => res.json(inventory);

export const getInventory = (req, res) => {
  const id = Number(req.params.id);
  const item = inventory.find(i => i.id === id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
};

export const createInventory = (req, res) => {
  const newItem = { id: Date.now(), ...req.body };
  inventory.push(newItem);
  res.status(201).json(newItem);
};

export const updateInventory = (req, res) => {
  const id = Number(req.params.id);
  const index = inventory.findIndex(i => i.id === id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  inventory[index] = { ...inventory[index], ...req.body };
  res.json(inventory[index]);
};

export const deleteInventory = (req, res) => {
  const id = Number(req.params.id);
  inventory = inventory.filter(i => i.id !== id);
  res.json({ success: true });
};
