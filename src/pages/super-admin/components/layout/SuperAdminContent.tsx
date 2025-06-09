
import React from 'react';
import SuperAdminUsers from '../SuperAdminUsers';
import SuperAdminProducts from '../SuperAdminProducts';
import SuperAdminAnalytics from '../SuperAdminAnalytics';
import SuperAdminInvoices from '../SuperAdminInvoices';
import SuperAdminModeration from '../SuperAdminModeration';
import SuperAdminCRM from '../SuperAdminCRM';
import SuperAdminSecurity from '../SuperAdminSecurity';
import SuperAdminTesting from '../SuperAdminTesting';
import SuperAdminFavorites from '../SuperAdminFavorites';
import SuperAdminReviews from '../SuperAdminReviews';
import SuperAdminNotifications from '../SuperAdminNotifications';
import SuperAdminAnalyticsEvents from '../SuperAdminAnalyticsEvents';
import SuperAdminAuditLogs from '../SuperAdminAuditLogs';
import SuperAdminRelayPoints from '../SuperAdminRelayPoints';

interface SuperAdminContentProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const SuperAdminContent = ({ activeTab, setActiveTab }: SuperAdminContentProps) => {
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {activeTab === 'users' && <SuperAdminUsers />}
      {activeTab === 'products' && <SuperAdminProducts />}
      {activeTab === 'analytics' && <SuperAdminAnalytics />}
      {activeTab === 'invoices' && <SuperAdminInvoices />}
      {activeTab === 'moderation' && <SuperAdminModeration />}
      {activeTab === 'crm' && <SuperAdminCRM />}
      {activeTab === 'security' && <SuperAdminSecurity />}
      {activeTab === 'testing' && <SuperAdminTesting />}
      {activeTab === 'favorites' && <SuperAdminFavorites />}
      {activeTab === 'reviews' && <SuperAdminReviews />}
      {activeTab === 'notifications' && <SuperAdminNotifications />}
      {activeTab === 'analytics-events' && <SuperAdminAnalyticsEvents />}
      {activeTab === 'audit-logs' && <SuperAdminAuditLogs />}
      {activeTab === 'relay-points' && <SuperAdminRelayPoints />}
    </div>
  );
};

export default SuperAdminContent;
