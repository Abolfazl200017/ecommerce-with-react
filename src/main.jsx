import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import { Header } from './components/header'

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
    path: "/hello",
    element: <div>Hello world</div>
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
