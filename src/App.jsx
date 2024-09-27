import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header'
import Products from './Components/Products'
import Cart from './Components/Cart'


function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/about" element={<Products />} />
      </Routes>
    </>
  )
}

export default App
