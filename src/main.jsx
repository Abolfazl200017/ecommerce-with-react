// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { Header } from './components/header'
import Login from './screens/login'

function getElement(args) {
  return <>
    <Header />
    {args}
  </>
}
const router = createBrowserRouter([
  {
    path: "/",
    element: getElement(<App />)
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
  <RouterProvider router={router} />
)
// <StrictMode>
// </StrictMode>,
