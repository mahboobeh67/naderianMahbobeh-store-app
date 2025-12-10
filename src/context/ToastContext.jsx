import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useRef,
} from "react";
import ToastContainer from "../components/toast/ToastContainer";

const ToastContext = createContext();

const initialState = [];

// 🎛 Reducer برای مدیریت لیست توست‌ها
function toastReducer(state, action) {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, action.payload];
    case "REMOVE_TOAST":
      return state.filter((t) => t.id !== action.id);
    case "CLEAR_ALL":
      return [];
    default:
      return state;
  }
}

export function ToastProvider({ children }) {
  const [toasts, dispatch] = useReducer(toastReducer, initialState);
  const timeoutRefs = useRef({}); // برای کنترل پاک شدن توست‌ها بدون تداخل

  // ✨ افزودن یک Toast جدید
  const showToast = useCallback(
    ({
      message,
      type = "info",
      duration = 3000,
      closable = true,
      action,
      icon,
      position = "top-right",
    }) => {
      const id = Date.now();
      const toast = {
        id,
        message,
        type,
        duration,
        closable,
        action,
        icon,
        position,
      };

      dispatch({ type: "ADD_TOAST", payload: toast });

      if (duration && duration > 0) {
        if (timeoutRefs.current[id]) clearTimeout(timeoutRefs.current[id]);
        timeoutRefs.current[id] = setTimeout(() => {
          dispatch({ type: "REMOVE_TOAST", id });
          delete timeoutRefs.current[id];
        }, duration);
      }
    },
    []
  );

  const removeToast = useCallback((id) => {
    dispatch({ type: "REMOVE_TOAST", id });
    if (timeoutRefs.current[id]) clearTimeout(timeoutRefs.current[id]);
    delete timeoutRefs.current[id];
  }, []);

  const clearAll = useCallback(() => {
    Object.values(timeoutRefs.current).forEach(clearTimeout);
    timeoutRefs.current = {};
    dispatch({ type: "CLEAR_ALL" });
  }, []);

  return (
    <ToastContext.Provider
      value={{ toasts, showToast, removeToast, clearAll }}
    >
      {children}

      {/* هر پوزیشن یک Container مجزا */}
      <ToastContainer position="top-left" />
      <ToastContainer position="top-center" />
      <ToastContainer position="top-right" />
      <ToastContainer position="bottom-left" />
      <ToastContainer position="bottom-center" />
      <ToastContainer position="bottom-right" />
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  return useContext(ToastContext);
}

