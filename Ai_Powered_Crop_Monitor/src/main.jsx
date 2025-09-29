import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HeroUIProvider } from "@heroui/react";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

// Set preferred dark theme by default
if (typeof document !== "undefined") {
  const root = document.body;
  if (root && !root.classList.contains("theme-dark")) {
    root.classList.remove("theme-light");
    root.classList.add("theme-dark");
  }
}

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  );
} else {
  console.error("Root element not found");
}
