// manageProduct.reducer.js
export const initialState = {
  page: 1,
  limit: 10,
  search: "",
  debouncedSearch: "",
  isModalOpen: false,
  modalMode: "create", // "create" | "edit"
  selectedProduct: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH":
      return {
        ...state,
        search: action.payload,
      };

    case "SET_DEBOUNCED_SEARCH":
      return {
        ...state,
        debouncedSearch: action.payload,
        page: 1,               // reset logic → بهترین مکان ممکن
      };

    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };

    case "OPEN_CREATE_MODAL":
      return {
        ...state,
        isModalOpen: true,
        modalMode: "create",
        selectedProduct: null,
      };

    case "OPEN_EDIT_MODAL":
      return {
        ...state,
        isModalOpen: true,
        modalMode: "edit",
        selectedProduct: action.payload,
      };

    case "CLOSE_MODAL":
      return {
        ...state,
        isModalOpen: false,
        selectedProduct: null,
      };

    default:
      return state;
  }
}
