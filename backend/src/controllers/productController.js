// controllers/productController.js
import products from "../data/products.js"; // دیتا MOCK که فعلاً داریم
import { v4 as uuid } from "uuid";

// GET ALL PRODUCTS
export const getAllProducts = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// GET PRODUCT BY ID
export const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find((p) => p.id === id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// CREATE NEW PRODUCT
export const createProduct = (req, res) => {
  try {
    const { name, price, category } = req.body;

    if (!name || !price) {
      return res
        .status(400)
        .json({ success: false, message: "Name & Price are required" });
    }

    const newProduct = {
      id: uuid(),
      name,
      price,
      category: category || "uncategorized",
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      message: "Product created",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// UPDATE PRODUCT
export const updateProduct = (req, res) => {
  try {
    const { id } = req.params;

    let product = products.find((p) => p.id === id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const updated = {
      ...product,
      ...req.body,
    };

    // جایگزینی در آرایه
    const index = products.findIndex((p) => p.id === id);
    products[index] = updated;

    res.status(200).json({
      success: true,
      message: "Product updated",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// DELETE PRODUCT
export const deleteProduct = (req, res) => {
  try {
    const { id } = req.params;

    const exists = products.some((p) => p.id === id);

    if (!exists) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const filtered = products.filter((p) => p.id !== id);
    products.length = 0;
    products.push(...filtered);

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
