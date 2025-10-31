import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminLayout from './components/layout/AdminLayout.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import ProductsAdmin from './pages/admin/ProductsAdmin.jsx';
import DealsAdmin from './pages/admin/DealsAdmin.jsx';
import OrdersAdmin from './pages/admin/OrdersAdmin.jsx';
import UsersAdmin from './pages/admin/UsersAdmin.jsx';
import CustomizationAdmin from './pages/admin/CustomizationAdmin.jsx';
import Login from './pages/auth/Login.jsx';
import ForgotPassword from './pages/auth/ForgotPassword.jsx';
import VerifyOtp from './pages/auth/VerifyOtp.jsx';
import ResetPassword from './pages/auth/ResetPassword.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes without layout */}
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Admin routes with layout */}
        <Route path="/admin" element={<AdminLayout />}> 
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="deals" element={<DealsAdmin />} />
          <Route path="orders" element={<OrdersAdmin />} />
          <Route path="users" element={<UsersAdmin />} />
          <Route path="customization" element={<CustomizationAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
