import { useState } from 'react'
import Home from './pages/Home'
import {Routes, Route, Navigate} from 'react-router-dom'
import './styles/App.css'

function App() {

  return (
    <body>
      <div className='app-container '>
      
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      </div>
    </body>
    
  )
}

export default App
