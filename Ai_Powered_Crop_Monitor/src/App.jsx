import React, { useState } from 'react'
import './index.css'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import DataHandling from './components/DataHandling'
import Preprocessing from './components/Preprocessing'
import FeatureExtraction from './components/FeatureExtraction'
import AIModels from './components/AIModels'
import PredictionSystem from './components/PredictionSystem'
import Visualization from './components/Visualization'
import Sidebar from './components/Sidebar'

function App() {
  const [activeSection, setActiveSection] = useState('dashboard')

  const renderSection = () => {
    switch(activeSection) {
      case 'data-handling':
        return <DataHandling />
      case 'preprocessing':
        return <Preprocessing />
      case 'feature-extraction':
        return <FeatureExtraction />
      case 'ai-models':
        return <AIModels />
      case 'prediction':
        return <PredictionSystem />
      case 'visualization':
        return <Visualization />
      default:
        return <HeroSection />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1">
          {renderSection()}
        </main>
      </div>
    </div>
  )
}

export default App
