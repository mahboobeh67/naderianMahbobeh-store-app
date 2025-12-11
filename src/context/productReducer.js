export const initialState = {
  products: [],
  meta: { page: 1, totalPages: 1 },
  isLoading: false,       // برای بارگذاری اولیه یا عملیات CRUD
  isRefetching: false,    // برای invalidateProducts (رفرش داده)
  error: null,
  _backup: null,          // برای Rollback در خطاهای Optimistic
};

export function productReducer(state, action) {
  switch (action.type) {

    // ======================================
    // Loading States
    // ======================================
    case "LOADING":
      return { 
        ...state, 
        isLoading: true, 
        error: null 
      };

    case "REFETCHING":
      return { 
        ...state, 
        isRefetching: true, 
        error: null 
      };

    // ======================================
    // Set Products (after fetch)
    // ======================================
    case "SET_PRODUCTS":
      return {
        ...state,
        isLoading: false,
        isRefetching: false,
        error: null,
        products: action.payload.items || [],
        meta: action.payload.meta || state.meta,
      };

    // ======================================
    // OPTIMISTIC BACKUP (برای rollback)
    // ======================================
    case "BACKUP_STATE":
      return {
        ...state,
        _backup: {
          products: structuredClone(state.products),
          meta: structuredClone(state.meta),
        }
      };

    case "ROLLBACK":
      return {
        ...state,
        isLoading: false,
        isRefetching: false,
        error: action.payload || "خطا",
        products: state._backup ? state._backup.products : state.products,
        meta: state._backup ? state._backup.meta : state.meta,
        _backup: null,
      };


    // ======================================
    // Add Product (Optimistic)
    // ======================================
    case "ADD_PRODUCT_OPTIMISTIC":
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    case "ADD_PRODUCT_CONFIRMED":
      return {
        ...state,
        isLoading: false,
      };


    // ======================================
    // Update Product (Optimistic)
    // ======================================
    case "UPDATE_PRODUCT_OPTIMISTIC":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? { ...p, ...action.payload } : p
        ),
      };

    case "UPDATE_PRODUCT_CONFIRMED":
      return {
        ...state,
        isLoading: false,
      };


    // ======================================
    // Delete Product (Optimistic)
    // ======================================
    case "DELETE_PRODUCT_OPTIMISTIC":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
      };

    case "DELETE_PRODUCT_CONFIRMED":
      return {
        ...state,
        isLoading: false,
      };


    // ======================================
    // Error
    // ======================================
    case "ERROR":
      return { 
        ...state, 
        isLoading: false,
        isRefetching: false,
        error: action.payload 
      };


    default:
      return state;
  }
}
