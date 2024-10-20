import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Header } from './components/header'

function App() {
  return (
    <>
      <header className='fixed-top left-0 vw-100 d-flex justify-content-center'>
        <Header />
      </header>
      <main>
        this is main
      </main>
      <footer>
        this is footer
      </footer>
    </>
  )
}

export default App
