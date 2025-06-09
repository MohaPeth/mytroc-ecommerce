
import React from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import CommissionDashboard from '@/components/commissions/CommissionDashboard';

const ProCommissions = () => {
  return (
    <ProDashboardLayout title="Commissions">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Gestion des commissions</h1>
          <p className="text-muted-foreground">
            Suivez vos gains et commissions en temps réel
          </p>
        </div>
        
        <CommissionDashboard />
      </div>
    </ProDashboardLayout>
  );
};

export default ProCommissions;
