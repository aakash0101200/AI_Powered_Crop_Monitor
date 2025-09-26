// src/App.jsx
import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";

// Layout Components
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

/**
 * Safe lazy-load wrapper for ThemeToggle from apex UI kit (or local copy).
 * We attempt to import the package and gracefully fall back to a no-op component
 * if the import fails (avoids breaking the whole app during dev).
 *
 * Adjust the dynamic import path if you have a local copy:
 *  - 'apex-ui-kit' OR './ApexUI-Kit/ThemeToggle/ThemeToggle'
 */
const LazyThemeToggle = lazy(async () => {
  try {
    const mod = await import("apex-ui-kit");
    // Try to extract a named export or default. Adjust keys if your package exposes differently.
    const Comp = mod.ThemeToggle ?? mod.default ?? mod.ThemeToggleComponent ?? null;
    return { default: Comp ?? (() => null) };
  } catch (err) {
    // If apex-ui-kit isn't available at runtime (or path differs), fall back to a noop component.
    return { default: () => null };
  }
});

/** Minimal ErrorBoundary for lazy-loaded UI pieces */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    // You can report this to your error logging service
    // console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return null; // silent fallback for small UI pieces
    }
    return this.props.children;
  }
}

function App() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarCollapsed((s) => !s);

  return (
    <Router>
      {/* Skip-link for keyboard users */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 bg-white/90 text-ui-text px-3 py-1 rounded"
      >
        Skip to content
      </a>

      <div className="flex min-h-screen bg-ui-bg-2">
        {/* Sidebar */}
        <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

        {/* Main area */}
        <div className="flex-1 flex flex-col min-h-screen relative">
          {/* Navbar - keep it above content */}
          <header className="sticky top-0 z-30">
            <Navbar />
          </header>

          {/* Theme Toggle - placed visually above content, inside header area */}
          <div className="absolute top-4 right-4 z-40">
            <ErrorBoundary>
              <Suspense fallback={null}>
                {/* Example props — update according to the ThemeToggle's API if needed */}
                <LazyThemeToggle
                  LightTheme="theme-light"
                  DarkTheme="theme-dark"
                  animation="circle-left"
                  duration="1s"
                  className="shadow-md"
                />
              </Suspense>
            </ErrorBoundary>
          </div>

          {/* Main content area. pt-20 ensures content doesn't hide behind navbar (adjust as needed) */}
          <main id="main" className="flex-1 p-0 lg:p-8 overflow-y-auto pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Redirect common legacy path or unknown pages to home or a 404 page */}
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
export default App;
