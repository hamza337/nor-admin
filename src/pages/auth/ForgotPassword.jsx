import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const goBack = () => {
    navigate('/');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email) { setError('Please enter your email.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/verify-otp', { state: { email }, replace: true });
    }, 1000);
  };

  return (
    <div className="text-black min-h-screen flex items-center justify-center bg-white p-6 sm:p-10">
      <div className="w-full max-w-md">
        <button onClick={goBack} className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:underline">
          <span>←</span>
          <span>Back</span>
        </button>
        <div className="flex justify-center items-center gap-3 mb-6">
          <img src="/logo.png" alt="NorDeal" className="w-10 h-10" />
          <h1 className="text-xl font-bold"><span className="text-[#E95817]">NOR</span><span style={{color:'#009CA8'}}>DEAL</span></h1>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Forgot Password</h2>
        <p className="text-sm text-gray-600 mb-4">Enter your email to receive an OTP for password reset.</p>
        {error && <div className="mb-4 rounded-md bg-red-50 text-red-700 text-sm px-4 py-2">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-left text-sm text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm" placeholder="you@company.com" />
          </div>
          <button type="submit" disabled={loading} className={`w-full bg-[#009CA8] text-white font-medium px-6 py-3 rounded-lg ${loading ? 'opacity-80 cursor-not-allowed' : 'hover:brightness-95'}`}>{loading ? 'Sending…' : 'Send OTP'}</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;