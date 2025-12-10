// src/context/productReducer.js

export const initialState = {
  products: [],
  loading: false,
  error: null,
};

export function productReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };

    case "SET_PRODUCTS":
      return { ...state, products: action.payload, loading: false };

    case "ADD_PRODUCT":
      return { 
        ...state,
        products: [...state.products, action.payload],
        loading: false 
      };

    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
        loading: false
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
        loading: false
      };

    case "ERROR":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
}
