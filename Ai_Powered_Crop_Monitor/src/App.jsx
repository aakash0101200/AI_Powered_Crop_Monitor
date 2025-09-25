import React, { useState } from 'react';
import './index.css';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import FeatureCard from './components/FeatureCard';
import StatCard from './components/StatCard';
import GraphCard from './components/GraphCard';

// ApexUI ThemeToggle
import ThemeToggle from '../ApexUI-Kit/ThemeToggle/ThemeToggle';

// Assets
import tractorImage from './assets/gem1.png';

function App() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 theme-light">
      {/* Sidebar */}
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col relative">
        {/* Navbar */}
        <Navbar />

        {/* Theme Toggle Button (top-right corner) */}
        <ThemeToggle
          LightTheme="theme-light"
          DarkTheme="theme-dark"
          animation="circle-left"
          duration="1s"
          className="absolute top-4 right-4 z-20"
        />


        {/* Main Content */}
        <main className="flex-1 p-0 lg:p-8 overflow-y-auto pt-20">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <div className="lg:col-span-12">
              <HeroSection />
            </div>

            <div className="lg:col-span-4 lg:col-start-1">
              <FeatureCard
                imageSrc={tractorImage}
                title="Unified Software Platform"
                description="Our system ingests and aligns image sequences with historical data, extracts key indices, and applies deep learning models to detect trends and predict risks."
                buttonText="Explore Features"
              />
            </div>

            <div className="lg:col-span-4 lg:col-start-5 flex flex-col sm:flex-row lg:flex-col gap-6">
              <StatCard
                title="AI-Driven Analysis"
                metric="Real-Time"
                description="Detect trends and predict vegetation stress or disease risk using deep learning models."
              />
              <StatCard
                title="Integrated Sensor Data"
                metric="+30% Accuracy"
                description="Fuse soil moisture, air temperature, and humidity to contextualize spectral anomalies."
              />
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <GraphCard />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
