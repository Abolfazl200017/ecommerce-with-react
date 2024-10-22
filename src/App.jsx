import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Home } from './screens/home'
import * as React from "react"
import FullPageSpinner from './components/full-page-loading';
import { Header } from './components/header'

function App() {
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <Header />
      <Home />
    </React.Suspense>
  )
}

export default App
