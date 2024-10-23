import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Home } from './screens/home'
import * as React from "react"
import FullPageSpinner from './components/full-page-loading';
import { Header } from './components/header'
import SingleProduct from './screens/single-product';
import { Route, Routes } from 'react-router-dom'
import { load } from './test/data/basket'
import Basket from './screens/basket';
import ProductList from './screens/product-list';

function App() {
  load()

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <Header />
      <AppRoutes />
    </React.Suspense>
  )
}

function AppRoutes() {
  return <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/product/:id" element={<SingleProduct />} />
    <Route path="/basket" element={<Basket />} />
    <Route path="/products" element={<ProductList />} />
    <Route path="*" element={<div>this is 404 error in future it will be more beautiful</div>} />
  </Routes>
}

export default App
