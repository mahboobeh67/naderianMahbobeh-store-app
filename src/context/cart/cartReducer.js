export const initialCartState = {
  items: [],
  totalCount: 0,
};

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find((i) => i.id === action.payload.id);

      let updatedItems;
      if (exists) {
        updatedItems = state.items.map((i) =>
          i.id === action.payload.id
            ? { ...i, quantity: i.quantity + action.payload.quantity }
            : i
        );
      } else {
        updatedItems = [...state.items, action.payload];
      }

      return {
        ...state,
        items: updatedItems,
        totalCount: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      };
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((i) => i.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
        totalCount: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      };
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((i) =>
        i.id === action.payload.id
          ? { ...i, quantity: action.payload.quantity }
          : i
      );
      return {
        ...state,
        items: updatedItems,
        totalCount: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
      };
    }

    case "CLEAR_CART":
      return initialCartState;

    default:
      return state;
  }
}
