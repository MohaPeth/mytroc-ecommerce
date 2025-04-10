
import React, { useState } from 'react';
import SuperAdminSidebar from './components/layout/SuperAdminSidebar';
import SuperAdminHeader from './components/layout/SuperAdminHeader';
import SuperAdminContent from './components/layout/SuperAdminContent';

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <SuperAdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main content */}
      <div className="ml-20 lg:ml-64 flex-1">
        {/* Header */}
        <SuperAdminHeader />
        
        {/* Page content */}
        <SuperAdminContent activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
