import React, { useState } from 'react';
import Pagination from '../../components/Pagination.jsx';
import DealDetailModal from './DealDetailModal.jsx';
import AddDealModal from './AddDealModal.jsx';
import DeleteConfirmModal from '../../components/DeleteConfirmModal.jsx';
import SuccessOverlay from '../../components/SuccessOverlay.jsx';

const deals = [
  {
    id: 1,
    title: 'Winter Warmth Combo',
    included: ['Pillows', 'Blankets', 'Cushions', '+2 more'],
    original: '1800 Kr',
    price: '1699 Kr',
    discount: '25%',
    date: '25 Jun, 2025 - 25 Sep, 2025',
    status: 'Active',
  },
  {
    id: 2,
    title: 'Complete Furniture Deal',
    included: ['Bed Set', 'Sofa Set', 'Cushions', '+10 more'],
    original: '1800 Kr',
    price: '1699 Kr',
    discount: '25%',
    date: '25 Jun, 2025 - 25 Sep, 2025',
    status: 'Active',
  },
  {
    id: 3,
    title: 'Pack of 5 Pillows',
    included: ['5 Pillows'],
    original: '1800 Kr',
    price: '1699 Kr',
    discount: '25%',
    date: '25 Jun, 2025 - 25 Sep, 2025',
    status: 'Active',
  },
  {
    id: 4,
    title: 'Electric White Blanket',
    included: ['Blanket'],
    original: '1800 Kr',
    price: '1699 Kr',
    discount: '25%',
    date: '25 Jun, 2025 - 25 Aug, 2025',
    status: 'Ended',
  },
];

const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
    status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
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

const DealsAdmin = () => {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [editable, setEditable] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setSuccessOpen(true);
    setTimeout(() => setSuccessOpen(false), 1500);
  };
  return (
    <div className="bg-white">
      <div className="mb-4 flex justify-end">
        <button
          className="inline-flex items-center gap-2 bg-[#009CA8] hover:brightness-95 text-white text-sm font-medium px-4 py-2 rounded-lg"
          aria-label="Add New Deal"
          onClick={() => setShowAdd(true)}
        >
          <span className="text-lg">＋</span>
          Add New Deal
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-[#00000080]">
        <table className="min-w-full divide-y divide-gray-200 text-left">
          <thead className="bg-[#E95817] text-white">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Image</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Deal Name / Title</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Product Included</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Original Price</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Deal Price</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Discount %age</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Start - End Date</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold ">Status</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold ">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {deals.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="px-4 sm:px-6 py-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200">
                    <img src="/logo.png" alt="Deal" className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-3">
                  <div className="text-sm font-medium text-gray-900">{d.title}</div>
                </td>
                <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">
                  <ul className="list-disc pl-5 space-y-1">
                    {d.included.map((it, idx) => (
                      <li key={idx} className="text-gray-700 text-sm">{it}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">{d.original}</td>
                <td className="px-4 sm:px-6 py-3 text-sm text-gray-900 font-semibold">{d.price}</td>
                <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">{d.discount}</td>
                <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">{d.date}</td>
                <td className="px-4 sm:px-6 py-3"><StatusBadge status={d.status} /></td>
                <td className="px-4 sm:px-6 py-3">
                  <ActionButtons
                    onView={() => { setSelected(d); setEditable(false); setShowDetail(true); }}
                    onEdit={() => { setSelected(d); setEditable(true); setShowDetail(true); }}
                    onDelete={() => { setSelected(d); setShowDelete(true); }}
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
      <DealDetailModal
        open={showDetail}
        onClose={() => setShowDetail(false)}
        deal={selected}
        editable={editable}
        onSave={() => { setShowDetail(false); showSuccess('Deal Updated Successfully'); }}
      />

      {/* Add Deal Modal */}
      <AddDealModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onAdded={() => { setShowAdd(false); showSuccess('Deal Added Successfully'); }}
      />

      {/* Delete Confirmation */}
      <DeleteConfirmModal
        open={showDelete}
        entity="deal"
        onCancel={() => setShowDelete(false)}
        onDelete={() => { setShowDelete(false); showSuccess('Deal Deleted Successfully'); }}
      />

      {/* Success Overlay */}
      <SuccessOverlay open={successOpen} message={successMsg} onClose={() => setSuccessOpen(false)} />
    </div>
  );
};

export default DealsAdmin;