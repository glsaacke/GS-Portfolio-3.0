import { useState, useEffect } from 'react'
import Home from './pages/Home'
import {Routes, Route, Navigate} from 'react-router-dom'
import './styles/App.css'

function App() {

  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 40 },
          color: { value: "#ffffff" },
          shape: { type: "edge" },
          opacity: { value: 0.3 },
          size: { value: 3 },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1
          },
          move: { enable: true, speed: 2 },
          line_linked: {enable_auto: false, opacity: 0.1}
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" }
          },
          modes: {
            repulse: { distance: 100 },
            push: { particles_nb: 4 }
          }
        },
        retina_detect: true
      });
    } else {
      console.error("particlesJS is not defined");
    }
  }, []);

  return (
      <div className='app-container '>
      
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      </div>
  )
}


export default App
