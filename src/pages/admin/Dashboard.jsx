import React, { useState } from 'react';

const StatCard = ({ title, value, sub, icon, accent }) => (
  <div className="rounded-xl border border-gray-200 bg-white p-5 flex items-start gap-4">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent}`}>
      {icon}
    </div>
    <div className="flex-1">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold text-gray-900">{value}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  </div>
);

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

const Dashboard = () => {
  const [rangePreset, setRangePreset] = useState('last7'); // last7 | last30 | lastMonth | custom
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const recentOrders = Array.from({ length: 6 }).map((_, i) => ({
    id: 2000 + i,
    customer: `Customer ${i + 1}`,
    items: (i % 4) + 1,
    total: `${(39 + i * 5).toFixed(2)} Kr`,
    status: ['Pending', 'Processing', 'Shipped', 'Delivered'][i % 4],
    date: `2025-10-${(i + 12).toString().padStart(2, '0')}`,
  }));

  const monthlyRevenue = [
    { month: 'May 2025', orders: 984, revenue: 68420 },
    { month: 'Jun 2025', orders: 1024, revenue: 71230 },
    { month: 'Jul 2025', orders: 1096, revenue: 74890 },
    { month: 'Aug 2025', orders: 1150, revenue: 78140 },
    { month: 'Sep 2025', orders: 1212, revenue: 82310 },
    { month: 'Oct 2025', orders: 1284, revenue: 92430 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        <div className="flex items-center gap-2">
          <select
            value={rangePreset}
            onChange={(e) => setRangePreset(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm text-black"
          >
            <option value="last7">Last 7 days</option>
            <option value="last30">Last 30 days</option>
            <option value="lastMonth">Last month</option>
            <option value="custom">Custom</option>
          </select>
          {rangePreset === 'custom' && (
            <>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm text-black"
              />
              <span className="text-gray-500">—</span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm text-black"
              />
            </>
          )}
          <button
            className="inline-flex items-center gap-2 bg-[#009CA8] hover:brightness-95 text-white text-sm font-medium px-4 py-2 rounded-md"
          >
            Apply
          </button>
          <button
            onClick={() => { setRangePreset('last7'); setFromDate(''); setToDate(''); }}
            className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-50 text-gray-700"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <StatCard
          title="Total Revenue"
          value="$ 248,900"
          sub="▲ 12% vs last month"
          accent="bg-[#FFF0EA] text-[#E95817]"
          icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>}
        />
        <StatCard
          title="Orders"
          value="1,248"
          sub="Today: 86"
          accent="bg-[#E6F7F8] text-[#009CA8]"
          icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12l8.73-5.04"/><path d="M12 22V12"/></svg>}
        />
        <StatCard
          title="Products"
          value="684"
          sub="Low stock: 12"
          accent="bg-[#FFF0EA] text-[#E95817]"
          icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>}
        />
        <StatCard
          title="Customers"
          value="3,452"
          sub="New this month: 289"
          accent="bg-[#E6F7F8] text-[#009CA8]"
          icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>}
        />
        <StatCard
          title="Conversion Rate"
          value="3.2%"
          sub="▲ 0.4% vs last week"
          accent="bg-[#FFF0EA] text-[#E95817]"
          icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a10 10 0 0 1 14 0l2.49 2.49"/><path d="M20.49 15a10 10 0 0 1-14 0L4 12.51"/></svg>}
        />
        <StatCard
          title="Refunds"
          value="19"
          sub="Last 30 days"
          accent="bg-[#E6F7F8] text-[#009CA8]"
          icon={<svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9"/><polyline points="21 3 21 12 12 12"/></svg>}
        />
      </div>

      {/* Recent Orders and Monthly Revenue */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-stretch">
        <div className="space-y-3 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
          <div className="overflow-x-auto rounded-xl border border-[#00000080] flex-1">
            <table className="min-w-full divide-y divide-gray-200 text-left">
              <thead className="bg-[#E95817] text-white">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Order ID</th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Customer</th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Items</th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Total</th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-3 text-sm font-medium text-gray-900">#{o.id}</td>
                    <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">{o.customer}</td>
                    <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">{o.items}</td>
                    <td className="px-4 sm:px-6 py-3 text-sm text-gray-900 font-semibold">{o.total}</td>
                    <td className="px-4 sm:px-6 py-3"><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-3 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800">Monthly Revenue</h2>
          <div className="overflow-x-auto rounded-xl border border-[#00000080] flex-1">
            <table className="min-w-full divide-y divide-gray-200 text-left">
              <thead className="bg-[#E95817] text-white">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Month</th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Orders</th>
                  <th className="px-4 sm:px-6 py-3 text-xs font-semibold">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {monthlyRevenue.map((m, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 sm:px-6 py-3 text-sm font-medium text-gray-900">{m.month}</td>
                    <td className="px-4 sm:px-6 py-3 text-sm text-gray-700">{m.orders}</td>
                    <td className="px-4 sm:px-6 py-3 text-sm text-gray-900 font-semibold">{m.revenue.toLocaleString()} Kr</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


