import React from "react";
import ReactDOM from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  );
} else {
  console.error("Root element not found");
}
