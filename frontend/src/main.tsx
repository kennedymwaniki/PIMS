import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import "./index.css";
import App from "./App.tsx";
import { store } from "./app/store";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster
        position="top-center"
        richColors
        duration={3000}
        expand={false}
        theme="light"
      />
      <App />
    </Provider>
  </StrictMode>
);
