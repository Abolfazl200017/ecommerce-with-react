import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Home } from './screens/home'
import * as React from "react"
import FullPageSpinner from './components/full-page-loading';

function App() {
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <Home />
    </React.Suspense>
  )
}

export default App
