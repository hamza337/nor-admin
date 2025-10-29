import React, { useEffect } from 'react';

const AddDealModal = ({ open, onClose, onAdded }) => {
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-white w-[95vw] max-w-5xl rounded-xl shadow-xl overflow-hidden">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b flex items-center justify-between">
          <div className="flex-1 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[#009CA8] shadow-[0_0_0_8px_rgba(0,156,168,0.15)]">
              <span className="text-white text-2xl">+</span>
            </div>
            <h2 className="mt-3 text-lg sm:text-xl font-semibold text-gray-800">Add Deal</h2>
          </div>
          <button aria-label="Close" onClick={onClose} className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center">X
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Deal Name / Title */}
            <div>
              <label className="block text-sm text-black mb-2 text-left">Deal Name / Title</label>
              <input type="text" placeholder="Enter Full Name here" className="w-full border border-[#00000080] text-black rounded-lg px-4 py-3 text-sm" />
            </div>

            {/* Product Included */}
            <div>
              <label className="block text-sm text-black mb-2 text-left">Product Included</label>
              <div className="w-full border border-[#00000080] text-black rounded-lg px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-sm">Pillows</span>
                  <span className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 text-sm">Cushions</span>
                </div>
                <button type="button" className="p-2 rounded-md hover:bg-gray-100" aria-label="Open selector">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </button>
              </div>
            </div>

            {/* Original Price */}
            <div>
              <label className="block text-sm text-black mb-2 text-left">Original Price</label>
              <input type="text" placeholder="1699 Kr" className="w-full border border-[#00000080] text-black rounded-lg px-4 py-3 text-sm" />
            </div>

            {/* Deal Price */}
            <div>
              <label className="block text-sm text-black mb-2 text-left">Deal Price</label>
              <input type="text" placeholder="1800 Kr" className="w-full border border-[#00000080] text-black rounded-lg px-4 py-3 text-sm" />
            </div>

            {/* Discount %age (Optional) */}
            <div>
              <label className="block text-sm text-black mb-2 text-left">Discount %age ( Optional )</label>
              <input type="text" placeholder="25%" className="w-full border border-[#00000080] text-black rounded-lg px-4 py-3 text-sm" />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm text-black mb-2 text-left">Start Date</label>
              <div className="w-full border rounded-lg px-4 py-3 text-sm flex items-center gap-2 border border-[#00000080] text-black">
                <input type="text" placeholder="12 Aug, 2025" className="flex-1 outline-none" />
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm text-black mb-2 text-left">End Date</label>
              <div className="w-full border rounded-lg px-4 text-sm flex items-center gap-2 border border-[#00000080] text-black">
                <input type="text" placeholder="12 Sep, 2025" className="flex-1 outline-none rounded-lg px-4 py-3 text-sm" />
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm text-black mb-2 text-left rounded-lg px-4 text-sm">Status</label>
              <select className="w-full text-black rounded-lg px-4 py-3 border border-[#00000080] text-sm">
                <option>Active</option>
                <option>Ended</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-black mb-2 text-left">Upload Image</label>
              <div className="border border-[#00000080] text-black rounded-lg px-4 py-6 text-center text-sm text-gray-600">
                <input type="file" className="hidden" id="upload-image-input" />
                <label htmlFor="upload-image-input" className="cursor-pointer">Browse Image ( PDF, JPG )</label>
              </div>
            </div>

            {/* Description (full width, appears after upload section) */}
            <div className="md:col-span-2">
              <label className="block text-sm text-black mb-2 text-left">Description</label>
              <textarea rows="5" placeholder="Describe the product" className="w-full border border-[#00000080] text-black rounded-lg px-4 py-3 text-sm" />
            </div>
          </form>
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-0 bg-white px-6 py-4 border-t">
          <div className="flex flex-col gap-3 justify-center">
            <button onClick={() => onAdded && onAdded()} className="text-center gap-2 bg-[#009CA8] hover:brightness-95 text-white font-medium px-6 py-3 rounded-lg">
              <span className="text-lg">+ </span>
              Add Deal
            </button>
            <button onClick={onClose} className="inline-flex items-center justify-center bg-gray-200 text-gray-800 font-medium px-6 py-3 rounded-lg">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDealModal;