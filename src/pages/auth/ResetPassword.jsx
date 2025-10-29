import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const goBack = () => {
    navigate('/verify-otp');
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!password || !confirm) { setError('Please enter both fields.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/', { replace: true });
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Set New Password</h2>
        <p className="text-sm text-gray-600 mb-4">Resetting password for {email || 'your account'}.</p>
        {error && <div className="mb-4 rounded-md bg-red-50 text-red-700 text-sm px-4 py-2">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-left text-sm text-gray-700 mb-1">New Password</label>
            <div className="relative">
              <input type={show ? 'text' : 'password'} value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm" placeholder="••••••••" />
              <button type="button" onClick={()=>setShow(s=>!s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">{show?'Hide':'Show'}</button>
            </div>
          </div>
          <div>
            <label className="block text-left text-sm text-gray-700 mb-1">Confirm New Password</label>
            <input type={show ? 'text' : 'password'} value={confirm} onChange={(e)=>setConfirm(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className={`w-full bg-[#009CA8] text-white font-medium px-6 py-3 rounded-lg ${loading ? 'opacity-80 cursor-not-allowed' : 'hover:brightness-95'}`}>{loading ? 'Updating…' : 'Update Password'}</button>
        </form>
        <button onClick={()=>navigate('/')} className="mt-4 w-full text-sm text-gray-600 hover:underline">Back to login</button>
      </div>
    </div>
  );
};

export default ResetPassword;