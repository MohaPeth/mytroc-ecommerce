
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotificationToast from "@/components/notifications/NotificationToast";
import Index from "@/pages/Index";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Favorites from "@/pages/Favorites";
import Profile from "@/pages/Profile";
import OrderDetails from "@/pages/OrderDetails";
import Notifications from "@/pages/Notifications";
import FAQ from "@/pages/FAQ";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Reviews from "@/pages/Reviews";
import SellerStore from "@/pages/SellerStore";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ResetPassword from "@/pages/auth/ResetPassword";
import Checkout from "@/pages/checkout/Checkout";
import PersonalInfo from "@/pages/checkout/PersonalInfo";
import DeliveryDetails from "@/pages/checkout/DeliveryDetails";
import Confirmation from "@/pages/checkout/Confirmation";
import ThankYou from "@/pages/checkout/ThankYou";
import Dashboard from "@/pages/dashboard/Dashboard";
import MyProducts from "@/pages/dashboard/MyProducts";
import AddProduct from "@/pages/dashboard/AddProduct";
import Orders from "@/pages/dashboard/Orders";
import Offers from "@/pages/dashboard/Offers";
import MyTickets from "@/pages/dashboard/MyTickets";
import Settings from "@/pages/dashboard/Settings";
import Statistics from "@/pages/dashboard/Statistics";
import PerformanceMonitor from "@/pages/dashboard/PerformanceMonitor";
import TestingDashboard from "@/pages/dashboard/TestingDashboard";
import TicketsEvents from "@/pages/TicketsEvents";
import PublishTicket from "@/pages/PublishTicket";
import TicketDetail from "@/pages/TicketDetail";
import DashboardPro from "@/pages/dashboard-pro/DashboardPro";
import ProProducts from "@/pages/dashboard-pro/ProProducts";
import ProAddProduct from "@/pages/dashboard-pro/ProAddProduct";
import ProOrders from "@/pages/dashboard-pro/ProOrders";
import ProOffers from "@/pages/dashboard-pro/ProOffers";
import ProCommissions from "@/pages/dashboard-pro/ProCommissions";
import ProInvoices from "@/pages/dashboard-pro/ProInvoices";
import ProTickets from "@/pages/dashboard-pro/ProTickets";
import ProPublishTicket from "@/pages/dashboard-pro/ProPublishTicket";
import ProStatistics from "@/pages/dashboard-pro/ProStatistics";
import ProReviews from "@/pages/dashboard-pro/ProReviews";
import ProMarketing from "@/pages/dashboard-pro/ProMarketing";
import ProSettings from "@/pages/dashboard-pro/ProSettings";
import ProSupport from "@/pages/dashboard-pro/ProSupport";
import SuperAdminDashboard from "@/pages/super-admin/SuperAdminDashboard";
import NotFound from "@/pages/error/NotFound";
import ServerError from "@/pages/error/ServerError";
import { usePageTracking } from "@/hooks/usePageTracking";
import EnhancedMyProducts from "@/pages/dashboard/EnhancedMyProducts";

const queryClient = new QueryClient();

// Composant wrapper pour le tracking
const AppWithTracking = () => {
  usePageTracking(); // Track automatiquement les changements de page
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        
        {/* Routes boutique */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/boutique" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/produit/:id" element={<ProductDetail />} />
        
        {/* Routes panier et favoris */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/panier" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/favoris" element={<Favorites />} />
        
        {/* Routes profil et compte */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/commande/:id" element={<OrderDetails />} />
        <Route path="/commandes" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        
        {/* Routes informations */}
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/avis" element={<Reviews />} />
        <Route path="/seller/:id" element={<SellerStore />} />
        <Route path="/vendeur/:id" element={<SellerStore />} />
        
        {/* Routes services */}
        <Route path="/livraison" element={<FAQ />} />
        <Route path="/commande" element={<Profile />} />
        <Route path="/offres" element={<Profile />} />
        
        {/* Auth routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/connexion" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/inscription" element={<Register />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        <Route path="/auth/mot-de-passe-oublie" element={<ResetPassword />} />
        
        {/* Checkout routes */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/commande-checkout" element={<Checkout />} />
        <Route path="/checkout/informations" element={<PersonalInfo />} />
        <Route path="/checkout/livraison" element={<DeliveryDetails />} />
        <Route path="/checkout/confirmation" element={<Confirmation />} />
        <Route path="/checkout/merci" element={<ThankYou />} />
        
        {/* Dashboard routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tableau-de-bord" element={<Dashboard />} />
        <Route path="/dashboard/products" element={<EnhancedMyProducts />} />
        <Route path="/dashboard/produits" element={<EnhancedMyProducts />} />
        <Route path="/dashboard/add-product" element={<AddProduct />} />
        <Route path="/dashboard/ajouter-produit" element={<AddProduct />} />
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="/dashboard/commandes" element={<Orders />} />
        <Route path="/dashboard/offers" element={<Offers />} />
        <Route path="/dashboard/offres" element={<Offers />} />
        <Route path="/dashboard/tickets" element={<MyTickets />} />
        <Route path="/dashboard/billets" element={<MyTickets />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/parametres" element={<Settings />} />
        <Route path="/dashboard/statistics" element={<Statistics />} />
        <Route path="/dashboard/statistiques" element={<Statistics />} />
        <Route path="/dashboard/performance" element={<PerformanceMonitor />} />
        <Route path="/dashboard/testing" element={<TestingDashboard />} />
        
        {/* Events routes */}
        <Route path="/events" element={<TicketsEvents />} />
        <Route path="/evenements" element={<TicketsEvents />} />
        <Route path="/billets-evenements" element={<TicketsEvents />} />
        <Route path="/events/publish" element={<PublishTicket />} />
        <Route path="/evenements/publier" element={<PublishTicket />} />
        <Route path="/dashboard/publier-billet" element={<PublishTicket />} />
        <Route path="/events/:id" element={<TicketDetail />} />
        <Route path="/evenements/:id" element={<TicketDetail />} />
        
        {/* Pro Dashboard routes */}
        <Route path="/dashboard-pro" element={<DashboardPro />} />
        <Route path="/tableau-de-bord-pro" element={<DashboardPro />} />
        <Route path="/dashboard-pro/products" element={<ProProducts />} />
        <Route path="/dashboard-pro/produits" element={<ProProducts />} />
        <Route path="/dashboard-pro/add-product" element={<ProAddProduct />} />
        <Route path="/dashboard-pro/ajouter-produit" element={<ProAddProduct />} />
        <Route path="/dashboard-pro/orders" element={<ProOrders />} />
        <Route path="/dashboard-pro/commandes" element={<ProOrders />} />
        <Route path="/dashboard-pro/offers" element={<ProOffers />} />
        <Route path="/dashboard-pro/offres" element={<ProOffers />} />
        <Route path="/dashboard-pro/commissions" element={<ProCommissions />} />
        <Route path="/dashboard-pro/invoices" element={<ProInvoices />} />
        <Route path="/dashboard-pro/factures" element={<ProInvoices />} />
        <Route path="/dashboard-pro/tickets" element={<ProTickets />} />
        <Route path="/dashboard-pro/billets" element={<ProTickets />} />
        <Route path="/dashboard-pro/publish-ticket" element={<ProPublishTicket />} />
        <Route path="/dashboard-pro/publier-billet" element={<ProPublishTicket />} />
        <Route path="/dashboard-pro/statistics" element={<ProStatistics />} />
        <Route path="/dashboard-pro/statistiques" element={<ProStatistics />} />
        <Route path="/dashboard-pro/reviews" element={<ProReviews />} />
        <Route path="/dashboard-pro/avis" element={<ProReviews />} />
        <Route path="/dashboard-pro/marketing" element={<ProMarketing />} />
        <Route path="/dashboard-pro/settings" element={<ProSettings />} />
        <Route path="/dashboard-pro/parametres" element={<ProSettings />} />
        <Route path="/dashboard-pro/support" element={<ProSupport />} />
        
        {/* Super Admin routes - CRM et administration */}
        <Route path="/super-admin" element={<SuperAdminDashboard />} />
        <Route path="/admin" element={<SuperAdminDashboard />} />
        <Route path="/administration" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/admin/dashboard" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/users" element={<SuperAdminDashboard />} />
        <Route path="/admin/utilisateurs" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/products" element={<SuperAdminDashboard />} />
        <Route path="/admin/produits" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/analytics" element={<SuperAdminDashboard />} />
        <Route path="/admin/analytiques" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/invoices" element={<SuperAdminDashboard />} />
        <Route path="/admin/factures" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/moderation" element={<SuperAdminDashboard />} />
        <Route path="/admin/moderation" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/crm" element={<SuperAdminDashboard />} />
        <Route path="/admin/crm" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/security" element={<SuperAdminDashboard />} />
        <Route path="/admin/securite" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/testing" element={<SuperAdminDashboard />} />
        <Route path="/admin/tests" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/favorites" element={<SuperAdminDashboard />} />
        <Route path="/admin/favoris" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/reviews" element={<SuperAdminDashboard />} />
        <Route path="/admin/avis" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/notifications" element={<SuperAdminDashboard />} />
        <Route path="/admin/notifications" element={<SuperAdminDashboard />} />
        <Route path="/super-admin/analytics-events" element={<SuperAdminDashboard />} />
        <Route path="/admin/evenements-analytiques" element={<SuperAdminDashboard />} />
        
        {/* Error routes */}
        <Route path="/error/500" element={<ServerError />} />
        <Route path="/erreur/500" element={<ServerError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <NotificationToast />
      <Toaster />
    </>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <QueryClientProvider client={queryClient}>
          <Router>
            <AppWithTracking />
          </Router>
        </QueryClientProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
