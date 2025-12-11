// src/routes/productRoutes.js

import express from "express";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import {authenticateToken }from "../middleware/authMiddleware.js";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Path to the products JSON file
const productsFilePath = path.join(__dirname, "../data/products.json");

// --- Helper functions ---
const readProducts = () => {
  const data = fs.readFileSync(productsFilePath);
  return JSON.parse(data);
};

const writeProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

// ===============================================
// GET ALL PRODUCTS + PAGINATION + FILTER
// ===============================================
router.get("/", (req, res) => {
  const products = readProducts();

  let { page = 1, limit = 10, name, minPrice, maxPrice } = req.query;

  page = Math.max(1, parseInt(page) || 1);
  limit = Math.max(1, parseInt(limit) || 10);

  let filteredProducts = products;

  if (name) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  const minNum = parseFloat(minPrice);
  const maxNum = parseFloat(maxPrice);

  if (!isNaN(minNum)) filteredProducts = filteredProducts.filter((p) => p.price >= minNum);
  if (!isNaN(maxNum)) filteredProducts = filteredProducts.filter((p) => p.price <= maxNum);

  if (!isNaN(minNum) && !isNaN(maxNum) && minNum > maxNum) {
    return res.status(400).json({ message: "minPrice cannot be greater than maxPrice" });
  }

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / limit);

  if (page > totalPages && totalPages !== 0) {
    return res.status(400).json({
      message: `Page ${page} is out of bounds. Only ${totalPages} pages exist.`,
    });
  }

  const start = (page - 1) * limit;
  const paginated = filteredProducts.slice(start, start + limit);

  res.json({
    totalProducts,
    page,
    limit,
    totalPages,
    data: paginated,
  });
});

// ===============================================
// GET PRODUCT BY ID
// ===============================================
router.get("/:id", (req, res) => {
  const products = readProducts();
  const product = products.find((p) => p.id === req.params.id);

  if (!product) return res.status(404).json({ message: "Product not found" });

  res.json(product);
});

// ===============================================
// CREATE PRODUCT
// ===============================================
router.post("/", authenticateToken, (req, res) => {
  const products = readProducts();

  const newProduct = {
    id: uuidv4(),
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
  };

  products.push(newProduct);
  writeProducts(products);

  res.status(201).json(newProduct);
});

// ===============================================
// UPDATE PRODUCT
// ===============================================
router.put("/:id", authenticateToken, (req, res) => {
  const products = readProducts();
  const index = products.findIndex((p) => p.id === req.params.id);

  if (index === -1) return res.status(404).json({ message: "Product not found" });

  const updatedProduct = { ...products[index], ...req.body };
  products[index] = updatedProduct;
  writeProducts(products);

  res.json(updatedProduct);
});

// ===============================================
// DELETE ONE PRODUCT
// ===============================================
router.delete("/:id", authenticateToken, (req, res) => {
  const products = readProducts();
  const newProducts = products.filter((p) => p.id !== req.params.id);

  if (newProducts.length === products.length) {
    return res.status(404).json({ message: "Product not found" });
  }

  writeProducts(newProducts);
  res.status(204).send();
});

// ===============================================
// DELETE MULTIPLE PRODUCTS
// ===============================================
router.delete("/", authenticateToken, (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids)) {
    return res.status(400).json({ message: "IDs must be an array" });
  }

  const products = readProducts();
  const newProducts = products.filter((p) => !ids.includes(p.id));

  if (newProducts.length === products.length) {
    return res.status(404).json({ message: "No matching products to delete" });
  }

  writeProducts(newProducts);
  res.status(204).send();
});

// ===============================
// ESM Export
// ===============================
export default router;
