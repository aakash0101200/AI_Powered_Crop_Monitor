// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import SensorDashboard from './pages/SensorDashboard/SensorDashboard'

import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import HeroSection from './components/HeroSection'
import Farmers from "./pages/Farmers";
import Agronomists from "./pages/Agronomists";
import FieldTechnicians from "./pages/FieldTechnicians";

import { Layout, Menu, Typography } from 'antd';
import { DashboardOutlined, UploadOutlined, HistoryOutlined } from '@ant-design/icons';
import CropDashboard from './components/CropDashboard';
import RoleSwitcher from "./components/RoleSwitcher";


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

          {/* Role Switcher (top-right corner) */}
          <RoleSwitcher className="fixed top-4 right-4 z-50" />

          {/* Pages */}
          <main className="flex-1 overflow-y-auto pt-20 p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/crop-dashboard" element={<CropDashboard />} />
              <Route path="/farmers" element={<Farmers />} />
              <Route path="/agronomists" element={<Agronomists />} />
              <Route path="/field-technicians" element={<FieldTechnicians />} />

              
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
