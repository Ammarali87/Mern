import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// axios.defaults.baseURL =
//   process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/'
  
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
