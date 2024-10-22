// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Login from './screens/login'
import { AuthProvider } from './context/auth-context'

const router = createBrowserRouter([
  {
    path: "/",
    element: (<App />)
  },
  {
    path: "/login",
    element: (<Login />)
  },
  {
    path: "*",
    element: <div>
      this is 404 error in future it will be more beautiful
    </div>
  }
]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
)
// <StrictMode>
// </StrictMode>,
