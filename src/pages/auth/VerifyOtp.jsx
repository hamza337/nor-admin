import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const email = state?.email || '';
  const [digits, setDigits] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTimer(60);
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const onSubmit = (e) => {
    e.preventDefault();
    setError('');
    const code = digits.join('');
    if (code.length !== 6) { setError('Please enter the 6-digit OTP.'); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/reset-password', { state: { email }, replace: true });
    }, 1000);
  };

  const onResend = () => {
    if (timer > 0) return;
    setResending(true);
    setTimeout(() => {
      setResending(false);
      setTimer(60);
    }, 1000);
  };

  const goBack = () => {
     navigate('/forgot-password');
  };

  const handleChange = (idx, value) => {
    const v = value.replace(/\D/g, '').slice(0, 1);
    const next = [...digits];
    next[idx] = v;
    setDigits(next);
    if (v && idx < 5) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && idx > 0) {
      e.preventDefault();
      inputsRef.current[idx - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && idx < 5) {
      e.preventDefault();
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const arr = Array(6).fill('');
    for (let i = 0; i < pasted.length; i++) arr[i] = pasted[i];
    setDigits(arr);
    inputsRef.current[Math.min(pasted.length, 5)]?.focus();
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Verify OTP</h2>
        <p className="text-sm text-gray-600 mb-4">We sent a 6-digit OTP to {email || 'your email'}. Enter it below to continue.</p>
        {error && <div className="mb-4 rounded-md bg-red-50 text-red-700 text-sm px-4 py-2">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-left text-sm text-gray-700 mb-2">Enter OTP</label>
            <div className="flex items-center justify-between gap-2" onPaste={handlePaste}>
              {digits.map((d, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputsRef.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009CA8]"
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-gray-500">Only digits allowed. You can paste a full code.</p>
          </div>
          <button type="submit" disabled={loading} className={`w-full bg-[#009CA8] text-white font-medium px-6 py-3 rounded-lg ${loading ? 'opacity-80 cursor-not-allowed' : 'hover:brightness-95'}`}>{loading ? 'Verifying…' : 'Verify'}</button>
        </form>
        <div className="mt-4 flex items-center justify-between">
          <button onClick={onResend} disabled={timer > 0 || resending} className={`text-sm font-medium ${timer>0||resending? 'text-gray-400 cursor-not-allowed' : 'text-[#009CA8] hover:underline'}`}>{resending ? 'Resending…' : 'Resend OTP'}</button>
          <span className="text-xs text-gray-500">{timer > 0 ? `You can resend in ${timer}s` : 'You can resend now'}</span>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;