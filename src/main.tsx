import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@orvella/tokens/tokens.css'
import '@orvella/ui/styles.css'
import './styles/app.css'
import { App } from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
