import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ImageSearchProvider } from './components/ImageSearchContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ImageSearchProvider>
        <App />
      </ImageSearchProvider>
    </BrowserRouter>
  </StrictMode>,
)
