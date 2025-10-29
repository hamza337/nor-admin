import React, { useEffect } from 'react';

const SuccessOverlay = ({ open, message = 'Success', onClose, duration = 2000 }) => {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative bg-white rounded-xl shadow-lg px-8 py-6 text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-[#009CA8] flex items-center justify-center shadow-[0_0_0_6px_rgba(0,156,168,0.15)]">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <p className="mt-3 text-sm font-medium text-gray-800">{message}</p>
      </div>
    </div>
  );
};

export default SuccessOverlay;