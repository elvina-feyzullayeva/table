import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import AddProduct from './pages/AddProduct';
import { useEffect, useState } from 'react';
import NotFound from './pages/NotFound';


function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home products={products} setProducts={setProducts} />} />
        <Route path='/about/:id' element={<About />} />
        <Route path='/product/:id?' element={<AddProduct setProducts={setProducts} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
