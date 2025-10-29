import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import './App.css';
import Admin from './pages/admin/Admin.jsx';
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
        
        {/* App routes with layout */}
        <Route path="/admin" element={<Layout><Admin /></Layout>} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App
