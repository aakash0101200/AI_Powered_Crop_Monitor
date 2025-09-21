import { useState } from 'react'
import React from 'react'
import './index.css'
import HeroSection from './components/HeroSection'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <HeroSection/>
    <div className="container my-0 mx-auto mt-auto p-4 text-center">
        <h2 className="text-2xl font-bold mt-10">Welcome to AI Powered Crop Monitor 🌱</h2>
        <p className="mt-2 text-gray-700">
          This application helps farmers monitor their crops using advanced AI technologies.
        </p>
      </div>
    </>
  )
}

export default App
