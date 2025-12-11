import { useContext, useCallback } from "react";
import { CartContext } from "./CartContext";

export default function useCart() {
  const { items, totalCount, dispatch } = useContext(CartContext);

  const addItem = useCallback(
    (item) => dispatch({ type: "ADD_ITEM", payload: item }),
    [dispatch]
  );

  const removeItem = useCallback(
    (id) => dispatch({ type: "REMOVE_ITEM", payload: id }),
    [dispatch]
  );

  const updateQuantity = useCallback(
    (id, quantity) =>
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { id, quantity },
      }),
    [dispatch]
  );

  const clearCart = useCallback(
    () => dispatch({ type: "CLEAR_CART" }),
    [dispatch]
  );

  return {
    items,
    totalCount,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
}
