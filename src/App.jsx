import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import './App.css';
import Admin from './pages/admin/Admin.jsx';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          {/* <Route path="/" element={<Homepage />} />
          <Route path="/deals" element={<NewDeals />} />
          <Route path="/blankets" element={<ProductList />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/favourites" element={<Favourites />} /> */}
          {/* Add more routes here as needed */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
