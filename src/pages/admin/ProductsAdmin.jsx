import React, { useState } from 'react';
import Pagination from '../../components/Pagination.jsx';
import ProductDetailModal from './ProductDetailModal.jsx';
import DeleteConfirmModal from '../../components/DeleteConfirmModal.jsx';
import SuccessOverlay from '../../components/SuccessOverlay.jsx';

const rows = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  name: 'Blue Electric Blanket',
  price: '1699 Kr',
  original: '1800 Kr',
  category: 'Home Deals',
  subcategory: 'Beddings',
  location: 'Oslo',
  stock: '87 / 100',
  status: 'Active',
}));

const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
    status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
  }`}>{status}</span>
);

const ActionButtons = ({ onView, onEdit, onDelete }) => (
  <div className="flex items-center gap-2">
    <button onClick={onView} className="p-2 rounded-md bg-orange-100 text-orange-600" title="View" aria-label="View">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
    </button>
    <button onClick={onEdit} className="p-2 rounded-md bg-cyan-100 text-cyan-700" title="Edit" aria-label="Edit">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
    </button>
    <button onClick={onDelete} className="p-2 rounded-md bg-red-100 text-red-600" title="Delete" aria-label="Delete">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>
    </button>
  </div>
);

const ProductsAdmin = () => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [editable, setEditable] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setSuccessOpen(true);
    setTimeout(() => setSuccessOpen(false), 1500);
  };
  return (
    <div className="bg-white">

      <div className="overflow-x-auto rounded-xl border border-[#00000080]">
        <table className="min-w-full divide-y divide-gray-200 text-left">
          <thead className="bg-[#E95817] text-white">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Image</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Product Name / Title</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Price</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Category</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Sub Category</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Location</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Stock / Quantity</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Status</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 sm:px-6 py-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                    <img src="/logo.png" alt="Product" className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-3">
                  <div className="text-sm font-medium text-gray-900">{r.name}</div>
                </td>
                <td className="px-4 sm:px-6 py-3">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-900">{r.price}</span>
                    <span className="text-xs text-gray-500">{r.original}</span>
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">{r.category}</td>
                <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">{r.subcategory}</td>
                <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">{r.location}</td>
                <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">{r.stock}</td>
                <td className="px-4 sm:px-6 py-3"><StatusBadge status={r.status} /></td>
                <td className="px-4 sm:px-6 py-3">
                  <ActionButtons
                    onView={() => { setSelected(r); setEditable(false); setShowDetail(true); }}
                    onEdit={() => { setSelected(r); setEditable(true); setShowDetail(true); }}
                    onDelete={() => { setSelected(r); setShowDelete(true); }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination currentPage={page} totalPages={6} onPageChange={setPage} />

      {/* View/Edit Modal */}
      <ProductDetailModal
        open={showDetail}
        onClose={() => setShowDetail(false)}
        product={selected}
        editable={editable}
        onSave={() => { setShowDetail(false); showSuccess('Product Updated Successfully'); }}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmModal
        open={showDelete}
        entity="product"
        onCancel={() => setShowDelete(false)}
        onDelete={() => { setShowDelete(false); showSuccess('Product Deleted Successfully'); }}
      />

      {/* Success Overlay */}
      <SuccessOverlay open={successOpen} message={successMsg} onClose={() => setSuccessOpen(false)} />
    </div>
  );
};

export default ProductsAdmin;