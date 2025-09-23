import React, { useState } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import FeatureCard from './components/FeatureCard';
import StatCard from './components/StatCard';
import GraphCard from './components/GraphCard';

// Image import for the card, not the background
import tractorImage from './assets/gem1.png';

function App() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    // This bg-gray-50 provides the plain, light grey background
    <div className="flex min-h-screen bg-gray-50">
      
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        toggleSidebar={toggleSidebar} 
      />

      <div className="flex-1 flex flex-col">
        
        <Navbar />

        {/* MODIFICATION: Removed background image styles from the <main> tag */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto pt-20">          
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

            <div className="lg:col-span-12 ">
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