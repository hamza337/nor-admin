import React, { useState } from 'react';
import Pagination from '../../components/Pagination.jsx';
import DeleteConfirmModal from '../../components/DeleteConfirmModal.jsx';
import SuccessOverlay from '../../components/SuccessOverlay.jsx';
import UserDetailModal from './UserDetailModal.jsx';

const users = [
  { id: 1, name: 'Ava Johnson', email: 'ava.johnson@example.com', role: 'Customer', status: 'Active', joined: '2025-01-15' },
  { id: 2, name: 'Noah Williams', email: 'noah.williams@example.com', role: 'Admin', status: 'Active', joined: '2025-02-01' },
  { id: 3, name: 'Olivia Brown', email: 'olivia.brown@example.com', role: 'Customer', status: 'Blocked', joined: '2025-01-28' },
  { id: 4, name: 'Liam Jones', email: 'liam.jones@example.com', role: 'Customer', status: 'Active', joined: '2025-03-04' },
  { id: 5, name: 'Emma Garcia', email: 'emma.garcia@example.com', role: 'Customer', status: 'Active', joined: '2025-03-18' },
  { id: 6, name: 'Lucas Miller', email: 'lucas.miller@example.com', role: 'Customer', status: 'Active', joined: '2025-04-02' },
  { id: 7, name: 'Sophia Davis', email: 'sophia.davis@example.com', role: 'Admin', status: 'Active', joined: '2025-04-12' },
  { id: 8, name: 'James Rodriguez', email: 'james.rodriguez@example.com', role: 'Customer', status: 'Active', joined: '2025-05-09' },
  { id: 9, name: 'Mia Martinez', email: 'mia.martinez@example.com', role: 'Customer', status: 'Blocked', joined: '2025-05-22' },
  { id: 10, name: 'Ethan Hernandez', email: 'ethan.hernandez@example.com', role: 'Customer', status: 'Active', joined: '2025-06-01' },
];

const StatusBadge = ({ status }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
    status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
  }`}>{status}</span>
);

const ActionButtons = ({ onView, onEdit, onDelete }) => (
  <div className="flex items-center gap-2">
    <button onClick={onView} className="p-2 rounded-md bg-orange-100 text-[#E95817]" title="View" aria-label="View">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
    </button>
    <button onClick={onEdit} className="p-2 rounded-md bg-[#E6F7F8] text-[#009CA8]" title="Edit" aria-label="Edit">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
    </button>
    <button onClick={onDelete} className="p-2 rounded-md bg-red-100 text-red-600" title="Delete" aria-label="Delete">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>
    </button>
  </div>
);

const UsersAdmin = () => {
  const [page, setPage] = useState(1);
  const [userList, setUserList] = useState(users);
  const [selected, setSelected] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [editable, setEditable] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [search, setSearch] = useState('');

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setSuccessOpen(true);
    setTimeout(() => setSuccessOpen(false), 1500);
  };

  const normalized = search.trim().toLowerCase();
  const filteredUsers = !normalized
    ? userList
    : userList.filter((u) =>
        (u.name || '').toLowerCase().includes(normalized) ||
        (u.email || '').toLowerCase().includes(normalized)
      );

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mb-4 gap-3">
        <h2 className="text-lg font-semibold text-gray-800">User Management</h2>
        <div className="w-full max-w-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users by name or email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#00000080]">
        <table className="min-w-full divide-y divide-gray-200 text-left">
          <thead className="bg-[#E95817] text-white">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Name</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Email</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Status</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Joined</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 sm:px-6 py-6 text-center text-sm text-gray-500">No data found</td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-3">
                    <div className="text-sm font-medium text-gray-900">{u.name}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">{u.email}</td>
                  <td className="px-4 sm:px-6 py-3"><StatusBadge status={u.status} /></td>
                  <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">{u.joined}</td>
                  <td className="px-4 sm:px-6 py-3">
                    <ActionButtons
                      onView={() => { setSelected(u); setEditable(false); setShowDetail(true); }}
                      onEdit={() => { setSelected(u); setEditable(true); setShowDetail(true); }}
                      onDelete={() => { setSelected(u); setShowDelete(true); }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={page} totalPages={6} onPageChange={setPage} />

      <UserDetailModal
        open={showDetail}
        onClose={() => setShowDetail(false)}
        user={selected}
        editable={editable}
        onSave={(updated) => {
          setUserList((prev) => prev.map((x) => x.id === updated.id ? { ...x, ...updated } : x));
          setShowDetail(false);
          showSuccess('User Updated Successfully');
        }}
      />

      <DeleteConfirmModal
        open={showDelete}
        entity="user"
        onCancel={() => setShowDelete(false)}
        onDelete={() => { setShowDelete(false); showSuccess('User Deleted Successfully'); }}
      />

      <SuccessOverlay open={successOpen} message={successMsg} onClose={() => setSuccessOpen(false)} />
    </div>
  );
};

export default UsersAdmin;


