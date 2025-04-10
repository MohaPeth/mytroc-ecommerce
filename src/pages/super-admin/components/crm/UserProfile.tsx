
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import mock data
import { 
  USER_PROFILE, 
  PRODUCTS_DATA, 
  TRANSACTIONS_DATA, 
  RATINGS_DATA, 
  SALES_CHART_DATA 
} from './user-profile/mockData';

// Import components
import ProfileHeader from './user-profile/ProfileHeader';
import ProfileOverview from './user-profile/ProfileOverview';
import ProductsTab from './user-profile/ProductsTab';
import TransactionsTab from './user-profile/TransactionsTab';
import RatingsTab from './user-profile/RatingsTab';
import HistoryTab from './user-profile/HistoryTab';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Format date to French format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <ProfileHeader 
        userProfile={USER_PROFILE} 
        formatDate={formatDate} 
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="ratings">Évaluations</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <ProfileOverview 
            userProfile={USER_PROFILE} 
            formatDate={formatDate}
            salesChartData={SALES_CHART_DATA}
          />
        </TabsContent>
        
        <TabsContent value="products">
          <ProductsTab products={PRODUCTS_DATA} />
        </TabsContent>
        
        <TabsContent value="transactions">
          <TransactionsTab 
            transactions={TRANSACTIONS_DATA} 
            formatDate={formatDate} 
          />
        </TabsContent>
        
        <TabsContent value="ratings">
          <RatingsTab 
            ratings={RATINGS_DATA} 
            averageRating={USER_PROFILE.rating}
            formatDate={formatDate} 
          />
        </TabsContent>
        
        <TabsContent value="history">
          <HistoryTab formatDate={formatDate} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
