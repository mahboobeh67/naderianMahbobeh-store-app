
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "./context/ToastContext";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
const qc = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <QueryClientProvider client={qc}>

        <ProductProvider>

        <ToastProvider>

          <App />
        </ToastProvider>
          


        </ProductProvider>
        
      </QueryClientProvider>
    </AuthProvider>
  </BrowserRouter>
);
