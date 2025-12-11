// src/context/product/ProductContext.jsx
import { createContext, useContext, useEffect, useReducer } from "react";
import { productReducer, initialState } from "./productReducer";
import productService from "@/services/productService";

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // ============================
  // Fetch Products Function
  // (Moved out of useEffect for reusability)
  // ============================
  const fetchProducts = async () => {
    dispatch({ type: "LOADING" });
    try {
     
      const data = await productService.getList(); 
      dispatch({ type: "SET_PRODUCTS", payload: data });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message || "خطا در دریافت محصولات" });
    }
  };

  // ============================
  // Invalidate Products (Re-fetch)
  // ============================
  const invalidateProducts = () => {
    fetchProducts();
  };


  // ============================
  // Fetch Initial Products on mount
  // (Now calls the reusable fetchProducts)
  // ============================
  useEffect(() => {
    // Note: isMounted is less critical here since fetchProducts now handles
    // dispatching, and useEffect cleanup is mainly for preventing unmounted
    // component state updates. For complex scenarios, keeping it is safer.
    let isMounted = true; // Still good practice for async effects.

    fetchProducts();

    return () => {
      isMounted = false; // Prevents state updates on unmounted component
    };
  }, []); // Empty dependency array means it runs only once on mount


  async function addProduct(product) {
 
    dispatch({ type: "LOADING" }); 

    try {
      const newProduct = await productService.create(product);
      dispatch({ type: "ADD_PRODUCT", payload: newProduct });
     
      invalidateProducts(); 
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  }


  async function updateProduct(id, updates) {
    dispatch({ type: "LOADING" });

    try {
      const updated = await productService.update(id, updates);
      dispatch({ type: "UPDATE_PRODUCT", payload: updated });
      // رفرش کردن لیست بعد از به‌روزرسانی
      invalidateProducts(); 
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  }

  // ============================
  // Delete Product
  // ============================
  async function deleteProduct(id) {
    dispatch({ type: "LOADING" });

    try {
      await productService.delete(id);
      dispatch({ type: "DELETE_PRODUCT", payload: id });
      // رفرش کردن لیست بعد از حذف
      invalidateProducts(); 
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
    invalidateProducts, // 👈 اضافه شد!
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

// =======================
// Custom Hook
// =======================
export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used inside <ProductProvider>");
  return ctx;
}

