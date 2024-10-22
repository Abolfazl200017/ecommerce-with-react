// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import App from './App'
import Login from './screens/login'
import { AuthProvider } from './context/auth-context'


createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<App />} />
      </Routes>
    </Router>
  </AuthProvider>
)
// <StrictMode>
// </StrictMode>,
