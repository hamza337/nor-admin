import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13h8V3H3z"/><path d="M13 21h8V11h-8z"/><path d="M13 3h8"/><path d="M3 21h8v-6H3z"/></svg>
  ) },
//   { to: '/admin/products', label: 'Products', icon: (
//     <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12l8.73-5.04"/><path d="M12 22V12"/></svg>
//   ) },
//   { to: '/admin/deals', label: 'Deals', icon: (
//     <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-8-8a2 2 0 0 0-2.83 0l-6.34 6.34a2 2 0 0 0 0 2.83l8 8a2 2 0 0 0 2.83 0l6.34-6.34a2 2 0 0 0 0-2.83z"/><path d="M7 7h.01"/></svg>
//   ) },
  { to: '/admin/orders', label: 'Orders', icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96L12 12l8.73-5.04"/><path d="M12 22V12"/></svg>
  ) },
  { to: '/admin/users', label: 'Users', icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ) },
  { to: '/admin/customization', label: 'Customization', icon: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c0 .66.26 1.3.73 1.77.47.47 1.11.73 1.77.73H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
  ) },
];

const Sidebar = ({ collapsed: initialCollapsed = false, onToggle }) => {
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  useEffect(() => {
    const saved = localStorage.getItem('admin.sidebar.collapsed');
    if (saved !== null) {
      setCollapsed(saved === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('admin.sidebar.collapsed', String(collapsed));
  }, [collapsed]);

  const toggle = () => {
    const next = !collapsed;
    setCollapsed(next);
    if (onToggle) onToggle(next);
  };

  return (
    <aside className={`${collapsed ? 'w-16' : 'w-64'} transition-all duration-200 bg-white border-r border-gray-200 h-[calc(100vh-64px)] sticky top-16`}>
      <div className="h-16 flex items-center justify-between px-3 border-b border-gray-100">
        {collapsed ? (
          <img src="/logo.png" alt="NorDeal" className="w-8 h-8" />
        ) : (
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="NorDeal" className="w-8 h-8" />
            <span className="text-lg font-bold">
              <span className="text-[#E95817]">NOR</span>
              <span style={{color: '#009CA8'}}>DEAL</span>
            </span>
          </Link>
        )}
        <button
          onClick={toggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="p-2 rounded-full border border-[#E95817] text-[#E95817] hover:bg-[#FFF0EA]"
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          )}
        </button>
      </div>

      <nav className="py-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin'}
            className={({ isActive }) => `
              group flex items-center gap-3 mx-2 my-1 px-3 py-2 rounded-lg text-base
              ${isActive ? 'bg-[#FFF0EA]' : ''}
              text-black hover:bg-[#FFF0EA] hover:text-[#E95817]
            `}
            title={collapsed ? item.label : undefined}
          >
            <span className="text-black group-aria-[current=page]:text-[#E95817] group-hover:text-[#E95817]">{item.icon}</span>
            {!collapsed && (
              <span className="text-black group-aria-[current=page]:text-[#E95817] group-aria-[current=page]:font-medium group-hover:text-[#E95817]">
                {item.label}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;


