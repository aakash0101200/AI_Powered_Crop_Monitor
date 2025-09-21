import { useState } from 'react'
import React from 'react'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <h1>AI Powered Crop Monitor</h1>
        <p>Welcome to the AI Powered Crop Monitor application!</p>
        <p>This application helps farmers monitor their crops using advanced AI technologies.</p>
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
      </div>
      <div className="fixed-bottom">
        <p>© 2024 AI Powered Crop Monitor. All rights reserved.</p>
      </div>
      <div className='bg-blue-500 text-white p-4'>
        <p>This is a colored border at the bottom of the page.</p>
      </div>
      
    </>
  )
}

export default App
