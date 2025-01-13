import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthContextProvider from './Context/AuthContext'
import MainLayout from './Layout/MainLayout'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider >
      <MainLayout />
    </AuthContextProvider>
  </StrictMode>,
)
