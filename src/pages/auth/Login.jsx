import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/admin', { replace: true });
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      {/* Visual / Brand panel */}
      <div className="hidden lg:flex items-center justify-center bg-[#FFF0EA] p-12">
        <div className="max-w-md text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <img src="/logo.png" alt="NorDeal" className="w-12 h-12" />
            <h1 className="text-3xl font-bold"><span className="text-[#E95817]">NOR</span><span style={{color:'#009CA8'}}>DEAL</span></h1>
          </div>
          <p className="text-gray-700 leading-relaxed">Welcome back. Log in to access the admin panel and manage products, deals, and promotions professionally.</p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Login</h2>
          {error && <div className="mb-4 rounded-md bg-red-50 text-red-700 text-sm px-4 py-2">{error}</div>}
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1 text-left">Email</label>
              <input type="email" autoComplete="email" value={email} onChange={(e)=>setEmail(e.target.value)} className=" text-black w-full border border-gray-300 rounded-lg px-4 py-3 text-sm" placeholder="you@company.com" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm text-gray-700">Password</label>
                <Link to="/forgot-password" className="text-xs text-[#009CA8] hover:underline">Forgot password?</Link>
              </div>
              <input type="password" autoComplete="current-password" value={password} onChange={(e)=>setPassword(e.target.value)} className=" text-black w-full border border-gray-300 rounded-lg px-4 py-3 text-sm" placeholder="••••••••" />
            </div>

            <button type="submit" disabled={loading} className={`w-full flex items-center justify-center gap-2 bg-[#009CA8] text-white font-medium px-6 py-3 rounded-lg ${loading ? 'opacity-80 cursor-not-allowed' : 'hover:brightness-95'}`}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>

            <p className="text-xs text-gray-500 text-center">Professional, secure access for administrators only.</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;