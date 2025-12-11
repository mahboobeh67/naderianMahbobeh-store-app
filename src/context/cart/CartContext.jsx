import { createContext, useReducer, useEffect } from "react";
import { cartReducer, initialCartState } from "./cartReducer";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialCartState,
    () => {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : initialCartState;
    }
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const value = {
    items: state.items,
    totalCount: state.totalCount,
    dispatch,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
