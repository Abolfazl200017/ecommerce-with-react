import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Home } from './screens/home'
import * as React from "react"
import FullPageSpinner from './components/full-page-loading';
import { AuthProvider } from './context/auth-context'

function App() {
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <AuthProvider>
        <Home />
      </AuthProvider>
    </React.Suspense>
  )
}

export default App
