
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
import ProDashboard from './pages/dashboard-pro/DashboardPro';
import ProProducts from './pages/dashboard-pro/ProProducts';
import ProAddProduct from './pages/dashboard-pro/ProAddProduct';
import SuperAdminDashboard from './pages/super-admin/SuperAdminDashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';

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

              {/* User Dashboard Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/mes-produits" element={<MyProducts />} />
              <Route path="/dashboard/ajouter-produit" element={<AddProduct />} />
              <Route path="/dashboard/commandes" element={<Orders />} />
              <Route path="/dashboard/settings" element={<Settings />} />

              {/* Pro Dashboard Routes */}
              <Route path="/dashboard-pro" element={<ProDashboard />} />
              <Route path="/dashboard-pro/mes-produits" element={<ProProducts />} />
              <Route path="/dashboard-pro/ajouter-produit" element={<ProAddProduct />} />
              <Route path="/dashboard-pro/commandes" element={<ProOrders />} />
              <Route path="/dashboard-pro/offres" element={<ProOffers />} />
              <Route path="/dashboard-pro/factures" element={<ProInvoices />} />
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
