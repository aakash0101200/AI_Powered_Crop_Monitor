// src/App.jsx
import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import SensorDashboard from './pages/SensorDashboard/SensorDashboard'

import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import HeroSection from './components/HeroSection'

// Lazy load ThemeToggle
const ThemeToggle = lazy(() =>
  import("../ApexUI-Kit/ThemeToggle/ThemeToggle").catch(() => ({
    default: () => null,
  }))
);

function App() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setSidebarCollapsed((s) => !s);

  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

        {/* Main content */}
        <div className="flex-1 flex flex-col relative">
          {/* Navbar */}
          <Navbar />

          {/* Theme Toggle */}
          <Suspense fallback={null}>
            <ThemeToggle
              LightTheme="light"
              animation="circle-right"
              duration="1s"
              className="absolute top-4 right-4 z-20"
            />
          </Suspense>

          {/* Pages */}
          <main className="flex-1 overflow-y-auto pt-20 p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Fallback / redirects */}
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/" element={<HeroSection />} />
              <Route path="/sensor-dashboard" element={<SensorDashboard />} />
              
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
