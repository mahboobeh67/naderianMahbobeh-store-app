// src/context/ProductContext.jsx
import { createContext, useContext, useEffect, useReducer } from "react";
import { productReducer, initialState } from "./productReducer";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // =================================================
  // 📌 Fetch Products on mount
  // =================================================
  useEffect(() => {
    async function fetchProducts() {
      try {
        dispatch({ type: "LOADING" });

        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();

        dispatch({ type: "SET_PRODUCTS", payload: data });

      } catch (err) {
        dispatch({ type: "ERROR", payload: err.message });
      }
    }

    fetchProducts();
  }, []);

  // =================================================
  // 🟢 Add Product
  // =================================================
  async function addProduct(product) {
    try {
      dispatch({ type: "LOADING" });

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const newProduct = await res.json();

      dispatch({ type: "ADD_PRODUCT", payload: newProduct });

    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  }

  // =================================================
  // 🟡 Update Product
  // =================================================
  async function updateProduct(id, updates) {
    try {
      dispatch({ type: "LOADING" });

      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      const updated = await res.json();

      dispatch({ type: "UPDATE_PRODUCT", payload: updated });

    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  }

  // =================================================
  // 🔴 Delete Product
  // =================================================
  async function deleteProduct(id) {
    try {
      dispatch({ type: "LOADING" });

      await fetch(`/api/products/${id}`, { method: "DELETE" });

      dispatch({ type: "DELETE_PRODUCT", payload: id });

    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  }

  // ================================
  // VALUE
  // ================================
  const value = {
    ...state,
    addProduct,
    updateProduct,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

// Custom Hook
export function useProduct() {
  return useContext(ProductContext);
}
