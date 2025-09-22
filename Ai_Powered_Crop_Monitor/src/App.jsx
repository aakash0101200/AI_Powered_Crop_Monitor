import { useState } from 'react'
import React from 'react'
import './index.css'
import HeroSection from './components/HeroSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HeroSection />
      <section className="bg-white text-black py-10 text-center">
        <h2 className="text-2xl font-bold">Welcome to AI Powered Crop Monitor 🌱</h2>
        <p className="mt-2 text-gray-700">
          This application helps farmers monitor their crops using advanced AI technologies.
        </p>
      </section>
     </>
    
  )
}

export default App
