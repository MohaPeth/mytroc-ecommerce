
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from '@/components/ErrorBoundary';

// Import existing pages
import Index from './pages/Index';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/checkout/Checkout';
import Dashboard from './pages/dashboard/Dashboard';
import MyProducts from './pages/dashboard/MyProducts';
import AddProduct from './pages/dashboard/AddProduct';
import Orders from './pages/dashboard/Orders';
import Settings from './pages/dashboard/Settings';
import Statistics from './pages/dashboard/Statistics';
import ProDashboard from './pages/dashboard-pro/DashboardPro';
import ProProducts from './pages/dashboard-pro/ProProducts';
import ProAddProduct from './pages/dashboard-pro/ProAddProduct';
import ProCommissions from './pages/dashboard-pro/ProCommissions';
import SuperAdminDashboard from './pages/super-admin/SuperAdminDashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Favorites from './pages/Favorites';

// Import new pages that will be created
import MyTickets from './pages/dashboard/MyTickets';
import PublishTicket from './pages/PublishTicket';
import Offers from './pages/dashboard/Offers';
import ProTickets from './pages/dashboard-pro/ProTickets';
import ProPublishTicket from './pages/dashboard-pro/ProPublishTicket';
import ProOffers from './pages/dashboard-pro/ProOffers';
import ProStatistics from './pages/dashboard-pro/ProStatistics';
import ProReviews from './pages/dashboard-pro/ProReviews';
import ProMarketing from './pages/dashboard-pro/ProMarketing';
import ProInvoices from './pages/dashboard-pro/ProInvoices';
import ProSettings from './pages/dashboard-pro/ProSettings';
import ProSupport from './pages/dashboard-pro/ProSupport';

import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/produit/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/favorites" element={<Favorites />} />

              {/* User Dashboard Routes - Corrected paths */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/produits" element={<MyProducts />} />
              <Route path="/dashboard/billets" element={<MyTickets />} />
              <Route path="/dashboard/publier-billet" element={<PublishTicket />} />
              <Route path="/dashboard/ajouter-produit" element={<AddProduct />} />
              <Route path="/dashboard/commandes" element={<Orders />} />
              <Route path="/dashboard/offres" element={<Offers />} />
              <Route path="/dashboard/statistiques" element={<Statistics />} />
              <Route path="/dashboard/parametres" element={<Settings />} />

              {/* Pro Dashboard Routes - Corrected paths */}
              <Route path="/dashboard-pro" element={<ProDashboard />} />
              <Route path="/dashboard-pro/produits" element={<ProProducts />} />
              <Route path="/dashboard-pro/billets" element={<ProTickets />} />
              <Route path="/dashboard-pro/publier-billet" element={<ProPublishTicket />} />
              <Route path="/dashboard-pro/ajouter-produit" element={<ProAddProduct />} />
              <Route path="/dashboard-pro/commandes" element={<Orders />} />
              <Route path="/dashboard-pro/offres" element={<ProOffers />} />
              <Route path="/dashboard-pro/statistiques" element={<ProStatistics />} />
              <Route path="/dashboard-pro/avis" element={<ProReviews />} />
              <Route path="/dashboard-pro/marketing" element={<ProMarketing />} />
              <Route path="/dashboard-pro/factures" element={<ProInvoices />} />
              <Route path="/dashboard-pro/parametres" element={<ProSettings />} />
              <Route path="/dashboard-pro/support" element={<ProSupport />} />
              <Route path="/dashboard-pro/commissions" element={<ProCommissions />} />

              {/* Super Admin Routes */}
              <Route path="/super-admin" element={<SuperAdminDashboard />} />
              
              {/* Error Pages */}
              <Route path="/500" element={<ServerError />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
