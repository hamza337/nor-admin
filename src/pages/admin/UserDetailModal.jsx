import React, { useEffect, useState } from 'react';

const Field = ({ label, value, onChange, editable, type = 'text' }) => (
  editable ? (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009CA8]"
      />
    </div>
  ) : (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-600">{label}</span>
      <span className="text-sm text-gray-900">{String(value || '')}</span>
    </div>
  )
);

const getInitials = (fullName) => {
  const parts = String(fullName || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || 'U';
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
};

const RoleBadge = ({ role }) => (
  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#E6F7F8] text-[#009CA8]">
    {role || 'Customer'}
  </span>
);

const StatusBadge = ({ status }) => (
  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
    status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
  }`}>
    {status || 'Active'}
  </span>
);

const UserDetailModal = ({ open, onClose, user, editable = false, onSave }) => {
  const [form, setForm] = useState({ id: undefined, name: '', email: '', role: 'Customer', status: 'Active' });

  useEffect(() => {
    if (user) {
      setForm({ id: user.id, name: user.name || '', email: user.email || '', role: user.role || 'Customer', status: user.status || 'Active' });
    }
  }, [user]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg">
        <div className="relative px-6 py-5 border-b">
          <h3 className="text-base font-semibold text-gray-900 text-center">{form.name || 'Unnamed User'}</h3>
          <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#009CA8] text-white hover:brightness-95 flex items-center justify-center" aria-label="Close">✕</button>
        </div>

        <div className="p-6 space-y-6">
          {editable ? (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Profile</h4>
              <div className="grid grid-cols-1 gap-4">
                <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} editable={editable} />
                <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} editable={editable} type="email" />
                <Field label="Role" value={form.role} onChange={(v) => setForm({ ...form, role: v })} editable={editable} />
                <Field label="Status" value={form.status} onChange={(v) => setForm({ ...form, status: v })} editable={editable} />
              </div>
            </div>
          ) : (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Profile</h4>
              <div className="divide-y divide-gray-100 rounded-lg border border-gray-100">
                <div className="p-4"><Field label="Name" value={form.name} editable={false} /></div>
                <div className="p-4"><Field label="Email" value={form.email} editable={false} /></div>
                <div className="p-4"><Field label="Role" value={form.role} editable={false} /></div>
                <div className="p-4"><Field label="Status" value={form.status} editable={false} /></div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-5 border-t bg-gray-50 rounded-b-xl">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-white">Cancel</button>
          {editable ? (
            <button onClick={() => onSave && onSave(form)} className="inline-flex items-center gap-2 bg-[#009CA8] hover:brightness-95 text-white text-sm font-medium px-4 py-2 rounded-lg">Save Changes</button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;


