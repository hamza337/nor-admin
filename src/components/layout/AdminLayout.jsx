import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex bg-white">
        <Sidebar collapsed={sidebarCollapsed} onToggle={setSidebarCollapsed} />
        <main className="flex-1 min-h-[calc(100vh-64px)] p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;


