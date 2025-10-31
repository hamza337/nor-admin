import React from 'react';

const DealDetailModal = ({ open, onClose, deal, editable = false, onSave }) => {
  if (!open) return null;

  const Field = ({ label, children }) => (
    <div className="flex flex-col gap-2">
      <label className="text-left text-xs text-gray-600">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white w-[95vw] max-w-4xl rounded-xl shadow-xl overflow-hidden">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">{deal?.title || 'Winter Warmth Combo'}</h3>
          <button aria-label="Close" onClick={onClose} className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center">X
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        <div className="px-6 py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Image */}
          <div className="md:col-span-1">
            <div className="w-full rounded-lg overflow-hidden bg-gray-100">
              <img src="/logo.png" alt="Deal" className="w-full h-60 object-cover" />
            </div>
          </div>

          {/* Fields */}
          <div className="text-black text-left md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Deal Price">
              {editable ? (
                <input className="border rounded-md px-3 py-2 text-sm" defaultValue="1699 Kr" />
              ) : (
                <input className="border rounded-md px-3 py-2 text-sm" readOnly value="1699 Kr" />
              )}
            </Field>
            <Field label="Original Price">
              {editable ? (
                <input className="border rounded-md px-3 py-2 text-sm" defaultValue="1800 Kr" />
              ) : (
                <input className="border rounded-md px-3 py-2 text-sm" readOnly value="1800 Kr" />
              )}
            </Field>
            <Field label="Start Date">
              {editable ? (
                <input className="border rounded-md px-3 py-2 text-sm" defaultValue="12 Aug, 2025" />
              ) : (
                <input className="border rounded-md px-3 py-2 text-sm" readOnly value="12 Aug, 2025" />
              )}
            </Field>
            <Field label="End Date">
              {editable ? (
                <input className="border rounded-md px-3 py-2 text-sm" defaultValue="12 Sep, 2025" />
              ) : (
                <input className="border rounded-md px-3 py-2 text-sm" readOnly value="12 Sep, 2025" />
              )}
            </Field>
            <Field label="Status">
              {editable ? (
                <select className="border rounded-md px-3 py-2 text-sm" defaultValue="Active"><option>Active</option><option>Ended</option></select>
              ) : (
                <input className="border rounded-md px-3 py-2 text-sm" readOnly value="Active" />
              )}
            </Field>
          </div>
        </div>

        <div className="text-black text-left px-6 pb-6 md:col-span-2">
          <label className="text-left text-xs text-gray-600">Product Included</label>
          <div className="mt-2 border rounded-md px-3 py-2 flex items-center gap-2 flex-wrap text-sm">
            <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-700">Pillows</span>
            <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-700">Cushions</span>
          </div>
        </div>

        {/* Description */}
        <div className="text-black text-left px-6 pb-6">
          <label className="text-left text-xs text-gray-600">Description</label>
          {editable ? (
            <textarea rows="4" className="mt-2 w-full border rounded-md px-3 py-2 text-sm" defaultValue="Stay warm and cozy..." />
          ) : (
            <textarea rows="4" className="mt-2 w-full border rounded-md px-3 py-2 text-sm" readOnly value="Stay warm and cozy..." />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex flex-col justify-end gap-3">
          {editable ? (
            <>
              <button onClick={onClose} className="bg-gray-200 text-gray-800 px-5 py-2 rounded-md">Cancel</button>
              <button onClick={onSave} className="bg-[#009CA8] text-white px-5 py-2 rounded-md">Save Changes</button>
            </>
          ) : (
            <button onClick={onClose} className="w-full bg-teal-600 text-white px-5 py-2 rounded-md">Close</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DealDetailModal;