import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import App from "./App";
import { Toaster } from "react-hot-toast";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
  <App />
  <Toaster
  position="top-right"
  richColors
/>
</AuthProvider>
  </React.StrictMode>
)