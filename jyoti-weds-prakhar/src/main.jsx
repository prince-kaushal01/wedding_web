import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// On refresh the browser normally jumps back to where the user had scrolled.
// Turn that off and go to the top, so the site always starts from the envelope and Page1.
window.history.scrollRestoration = 'manual'
window.scrollTo(0, 0)

// Just before the page is refreshed or closed, go to the top as well,
// so the browser has nothing but the top position to remember
window.addEventListener('pagehide', () => window.scrollTo(0, 0))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
