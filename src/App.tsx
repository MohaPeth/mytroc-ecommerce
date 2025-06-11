import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from '@/components/ErrorBoundary';
import NotificationToast from '@/components/notifications/NotificationToast';

// Public Pages
import Index from './pages/Index';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Favorites from './pages/Favorites';
import TicketsEvents from './pages/TicketsEvents';
import TicketDetail from './pages/TicketDetail';
import SellerStore from './pages/SellerStore';
import Reviews from './pages/Reviews';
import Notifications from './pages/Notifications';
import OrderDetails from './pages/OrderDetails';
import Profile from './pages/Profile';

// Authentication Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ResetPassword from './pages/auth/ResetPassword';

// Checkout Pages
import Checkout from './pages/checkout/Checkout';
import PersonalInfo from './pages/checkout/PersonalInfo';
import DeliveryDetails from './pages/checkout/DeliveryDetails';
import Confirmation from './pages/checkout/Confirmation';
import ThankYou from './pages/checkout/ThankYou';

// User Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import MyProducts from './pages/dashboard/MyProducts';
import AddProduct from './pages/dashboard/AddProduct';
import Orders from './pages/dashboard/Orders';
import Settings from './pages/dashboard/Settings';
import Statistics from './pages/dashboard/Statistics';
import MyTickets from './pages/dashboard/MyTickets';
import PublishTicket from './pages/PublishTicket';
import Offers from './pages/dashboard/Offers';
import SuperAdmin from './pages/dashboard/SuperAdmin';

// Pro Dashboard Pages
import ProDashboard from './pages/dashboard-pro/DashboardPro';
import ProProducts from './pages/dashboard-pro/ProProducts';
import ProAddProduct from './pages/dashboard-pro/ProAddProduct';
import ProCommissions from './pages/dashboard-pro/ProCommissions';
import ProTickets from './pages/dashboard-pro/ProTickets';
import ProPublishTicket from './pages/dashboard-pro/ProPublishTicket';
import ProOffers from './pages/dashboard-pro/ProOffers';
import ProStatistics from './pages/dashboard-pro/ProStatistics';
import ProReviews from './pages/dashboard-pro/ProReviews';
import ProMarketing from './pages/dashboard-pro/ProMarketing';
import ProInvoices from './pages/dashboard-pro/ProInvoices';
import ProSettings from './pages/dashboard-pro/ProSettings';
import ProSupport from './pages/dashboard-pro/ProSupport';
import ProOrders from './pages/dashboard-pro/ProOrders';

// Super Admin Pages
import SuperAdminDashboard from './pages/super-admin/SuperAdminDashboard';

// Error Pages
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
            {/* Public Routes */}
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/boutique" element={<Navigate to="/shop" replace />} />
              <Route path="/produit/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/panier" element={<Navigate to="/cart" replace />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/confidentialite" element={<Navigate to="/privacy" replace />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/favoris" element={<Navigate to="/favorites" replace />} />
              <Route path="/tickets-events" element={<TicketsEvents />} />
              <Route path="/billets-evenements" element={<Navigate to="/tickets-events" replace />} />
              <Route path="/ticket/:id" element={<TicketDetail />} />
              <Route path="/billet/:id" element={<Navigate to="/ticket/:id" replace />} />
              <Route path="/seller/:id" element={<SellerStore />} />
              <Route path="/vendeur/:id" element={<Navigate to="/seller/:id" replace />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/avis" element={<Navigate to="/reviews" replace />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/commande/:id" element={<Navigate to="/order/:id" replace />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profil" element={<Navigate to="/profile" replace />} />

              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/connexion" element={<Navigate to="/login" replace />} />
              <Route path="/register" element={<Register />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/inscription" element={<Navigate to="/register" replace />} />
              <Route path="/auth/reset-password" element={<ResetPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/mot-de-passe-oublie" element={<Navigate to="/reset-password" replace />} />

              {/* Checkout Routes */}
              <Route path="/checkout" element={<Checkout />}>
                <Route index element={<PersonalInfo />} />
                <Route path="personal-info" element={<PersonalInfo />} />
                <Route path="delivery" element={<DeliveryDetails />} />
                <Route path="confirmation" element={<Confirmation />} />
                <Route path="thank-you" element={<ThankYou />} />
              </Route>
              <Route path="/commande" element={<Navigate to="/checkout" replace />} />

              {/* User Dashboard Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tableau-de-bord" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard/produits" element={<MyProducts />} />
              <Route path="/dashboard/billets" element={<MyTickets />} />
              <Route path="/dashboard/publier-billet" element={<PublishTicket />} />
              <Route path="/dashboard/ajouter-produit" element={<AddProduct />} />
              <Route path="/dashboard/commandes" element={<Orders />} />
              <Route path="/dashboard/offres" element={<Offers />} />
              <Route path="/dashboard/statistiques" element={<Statistics />} />
              <Route path="/dashboard/parametres" element={<Settings />} />
              <Route path="/dashboard/super-admin" element={<SuperAdmin />} />

              {/* Pro Dashboard Routes */}
              <Route path="/dashboard-pro" element={<ProDashboard />} />
              <Route path="/tableau-de-bord-pro" element={<Navigate to="/dashboard-pro" replace />} />
              <Route path="/dashboard-pro/produits" element={<ProProducts />} />
              <Route path="/dashboard-pro/billets" element={<ProTickets />} />
              <Route path="/dashboard-pro/publier-billet" element={<ProPublishTicket />} />
              <Route path="/dashboard-pro/ajouter-produit" element={<ProAddProduct />} />
              <Route path="/dashboard-pro/commandes" element={<ProOrders />} />
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
              <Route path="/super-admin/*" element={<SuperAdminDashboard />} />
              
              {/* Error Pages */}
              <Route path="/500" element={<ServerError />} />
              <Route path="/erreur-serveur" element={<Navigate to="/500" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <NotificationToast />
          </div>
        </Router>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
