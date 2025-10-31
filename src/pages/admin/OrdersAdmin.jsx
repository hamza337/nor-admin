import React, { useState } from 'react';
import Pagination from '../../components/Pagination.jsx';

const StatCard = ({ title, value, sub, accent }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-5 flex items-start gap-4">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent}`}>
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12l8.73-5.04"/><path d="M12 22V12"/></svg>
    </div>
    <div className="flex-1">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold text-gray-900">{value}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  </div>
);

const customerNames = [
  'Ava Johnson',
  'Noah Williams',
  'Olivia Brown',
  'Liam Jones',
  'Emma Garcia',
  'Lucas Miller',
  'Sophia Davis',
  'James Rodriguez',
];

const orders = Array.from({ length: 8 }).map((_, i) => ({
  id: 1000 + i,
  customer: customerNames[i % customerNames.length],
  items: (i % 4) + 1,
  total: `${(49 + i * 7).toFixed(2)} Kr`,
  status: ['Pending', 'Processing', 'Shipped', 'Delivered'][i % 4],
  date: `2025-10-${(i + 10).toString().padStart(2, '0')}`,
}));

const StatusBadge = ({ status }) => {
  const map = {
    Pending: 'bg-[#FFF0EA] text-[#E95817]',
    Processing: 'bg-[#E6F7F8] text-[#009CA8]',
    Shipped: 'bg-gray-100 text-gray-700',
    Delivered: 'bg-green-100 text-green-700',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status] || 'bg-gray-100 text-gray-700'}`}>{status}</span>
  );
};

const OrdersAdmin = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mb-6 gap-3">
        <h2 className="text-lg font-semibold text-gray-800">Orders</h2>
        <div className="w-full max-w-xs">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order ID or Customer"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-black"
          />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Orders" value="1,284" sub="Last 30 days" accent="bg-[#FFF0EA] text-[#E95817]" />
        <StatCard title="Pending" value="86" sub="Awaiting processing" accent="bg-[#FFF0EA] text-[#E95817]" />
        <StatCard title="Shipped" value="412" sub="In transit" accent="bg-[#E6F7F8] text-[#009CA8]" />
        <StatCard title="Revenue" value="$ 92,430" sub="Last 30 days" accent="bg-[#E6F7F8] text-[#009CA8]" />
      </div>

      {/* Orders table */}
      <div className="overflow-x-auto rounded-xl border border-[#00000080]">
        <table className="min-w-full divide-y divide-gray-200 text-left">
          <thead className="bg-[#E95817] text-white">
            <tr>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Order ID</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Customer</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Items</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Total</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Status</th>
              <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {(() => {
              const q = search.trim().toLowerCase();
              const filtered = orders.filter((o) => {
                if (!q) return true;
                const byId = String(o.id).toLowerCase().includes(q);
                const byCustomer = (o.customer || '').toLowerCase().includes(q);
                return byId || byCustomer;
              });
              if (filtered.length === 0) {
                return (
                  <tr>
                    <td colSpan={6} className="px-4 sm:px-6 py-6 text-center text-sm text-gray-500">No data found</td>
                  </tr>
                );
              }
              return filtered.map((o) => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-3 text-sm font-medium text-gray-900">#{o.id}</td>
                  <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">{o.customer}</td>
                  <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">{o.items}</td>
                  <td className="px-4 sm:px-6 py-3 text-sm text-gray-900 font-semibold">{o.total}</td>
                  <td className="px-4 sm:px-6 py-3"><StatusBadge status={o.status} /></td>
                  <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">{o.date}</td>
                </tr>
              ));
            })()}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={page} totalPages={6} onPageChange={setPage} />
    </div>
  );
};

export default OrdersAdmin;


