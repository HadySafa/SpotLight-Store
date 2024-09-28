import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header'
import Products from './Components/Products'
import Cart from './Components/Cart'
import Details from './Components/product-details';
import SearchResult from './Components/search-results';


function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search-results" element={<SearchResult />} />
        <Route path="/product-details/:index" element={<Details />} />
      </Routes>
    </>
  )
}

export default App
