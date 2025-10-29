import React from 'react';

const DeleteConfirmModal = ({ open, onCancel, onDelete, entity = 'item' }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-xl shadow-lg px-6 py-5 w-[90vw] max-w-sm text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>
        </div>
        <p className="mt-3 text-sm font-semibold">Delete Confirmation?</p>
        <p className="mt-1 text-xs text-gray-600">Are you sure you want to delete this {entity}?</p>
        <div className="mt-4 flex justify-center gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded-md bg-gray-200 text-gray-800">Cancel</button>
          <button onClick={onDelete} className="px-4 py-2 rounded-md bg-red-600 text-white">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;