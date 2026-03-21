import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({ duration: 500, easing: 'ease-out', once: true, offset: 60, delay: 0 })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)