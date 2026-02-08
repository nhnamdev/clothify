import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './components/Homepage'
import ProductDetail from './components/ProductDetail'
import Cart from './components/Cart'
import Category from './components/Category'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:name" element={<Category />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
