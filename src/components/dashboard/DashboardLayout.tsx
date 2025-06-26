
import React from 'react';
import { useLocation } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import BaseLayout from '@/components/layouts/BaseLayout';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title
}) => {
  const location = useLocation();

  // Get the user data from localStorage if available
  const getUserData = () => {
    const userData = localStorage.getItem("mytroc-user");
    if (userData) {
      return JSON.parse(userData);
    }
    return {
      name: "Utilisateur",
      email: "utilisateur@mytroc.com",
      role: "vendor"
    };
  };
  
  const user = getUserData();

  return (
    <BaseLayout
      title={title}
      sidebar={<DashboardSidebar />}
      showSearch={true}
      showNotifications={true}
    >
      {location.pathname === "/dashboard" && (
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold mb-1">Bonjour, {user?.name?.split(' ')[0] || "Utilisateur"}</h2>
          <p className="text-muted-foreground">
            Voici un aperçu de votre activité récente
          </p>
        </div>
      )}
      {children}
    </BaseLayout>
  );
};

export default DashboardLayout;
