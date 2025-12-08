let properties = [
  { id: 1, name: "رنگ", type: "string" },
  { id: 2, name: "سایز", type: "number" },
];

export const getAllProperties = (req, res) => res.json(properties);

export const getProperty = (req, res) => {
  const id = Number(req.params.id);
  const item = properties.find(p => p.id === id);
  if (!item) return res.status(404).json({ error: "Not found" });
  res.json(item);
};

export const createProperty = (req, res) => {
  const newItem = { id: Date.now(), ...req.body };
  properties.push(newItem);
  res.status(201).json(newItem);
};

export const updateProperty = (req, res) => {
  const id = Number(req.params.id);
  const index = properties.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  properties[index] = { ...properties[index], ...req.body };
  res.json(properties[index]);
};

export const deleteProperty = (req, res) => {
  const id = Number(req.params.id);
  properties = properties.filter(p => p.id !== id);
  res.json({ success: true });
};
