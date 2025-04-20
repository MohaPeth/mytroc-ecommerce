import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/checkout/Checkout";
import DeliveryDetails from "./pages/checkout/DeliveryDetails";
import PersonalInfo from "./pages/checkout/PersonalInfo";
import Confirmation from "./pages/checkout/Confirmation";
import ThankYou from "./pages/checkout/ThankYou";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import ResetPasswordPage from "./pages/auth/ResetPassword";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";
import Dashboard from "./pages/dashboard/Dashboard";
import MyProducts from "./pages/dashboard/MyProducts";
import AddProduct from "./pages/dashboard/AddProduct";
import Orders from "./pages/dashboard/Orders";
import Offers from "./pages/dashboard/Offers";
import Statistics from "./pages/dashboard/Statistics";
import Settings from "./pages/dashboard/Settings";
import SuperAdmin from "./pages/dashboard/SuperAdmin";
import Cart from "./pages/Cart";
import Reviews from "./pages/Reviews";
import OrderDetails from "./pages/OrderDetails";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import DashboardPro from "./pages/dashboard-pro/DashboardPro";
import ProProducts from "./pages/dashboard-pro/ProProducts";
import ProAddProduct from "./pages/dashboard-pro/ProAddProduct";
import ProOrders from "./pages/dashboard-pro/ProOrders";
import ProOffers from "./pages/dashboard-pro/ProOffers";
import ProStatistics from "./pages/dashboard-pro/ProStatistics";
import ProSettings from "./pages/dashboard-pro/ProSettings";
import ProSupport from "./pages/dashboard-pro/ProSupport";
import ProMarketing from "./pages/dashboard-pro/ProMarketing";
import ProInvoices from "./pages/dashboard-pro/ProInvoices";
import ProReviews from "./pages/dashboard-pro/ProReviews";
import SellerStore from "./pages/SellerStore";
import TicketsEvents from "./pages/TicketsEvents";
import PublishTicket from "./pages/PublishTicket";
import TicketDetail from "./pages/TicketDetail";
import Header from '@/components/header/Header';
import MyTickets from "./pages/dashboard/MyTickets";
import ProTickets from "./pages/dashboard-pro/ProTickets";
import ProPublishTicket from "./pages/dashboard-pro/ProPublishTicket";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/boutique" element={<Shop />} />
          <Route path="/produit/:id" element={<ProductDetail />} />
          <Route path="/panier" element={<Cart />} />
          <Route path="/checkout" element={<Navigate to="/checkout/informations" replace />} />
          <Route path="/checkout" element={<Checkout />}>
            <Route path="informations" element={<PersonalInfo />} />
            <Route path="livraison" element={<DeliveryDetails />} />
            <Route path="confirmation" element={<Confirmation />} />
            <Route path="merci" element={<ThankYou />} />
          </Route>
          <Route path="/merci" element={<ThankYou />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profil" element={<Profile />} />
          <Route path="/profile" element={<Navigate to="/profil" replace />} /> {/* Redirection de l'ancienne route */}
          <Route path="/order-details/:orderId" element={<OrderDetails />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/avis" element={<Reviews />} />
          <Route path="/vendeur/:id" element={<SellerStore />} />
          
          {/* Billets/Événements routes */}
          <Route path="/billets-evenements" element={<TicketsEvents />} />
          <Route path="/dashboard/billets" element={<MyTickets />} />
          <Route path="/dashboard/publier-billet" element={<PublishTicket />} />
          <Route path="/dashboard-pro/billets" element={<ProTickets />} />
          <Route path="/dashboard-pro/publier-billet" element={<ProPublishTicket />} />
          <Route path="/billet/:id" element={<TicketDetail />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/produits" element={<MyProducts />} />
          <Route path="/dashboard/ajouter-produit" element={<AddProduct />} />
          <Route path="/dashboard/commandes" element={<Orders />} />
          <Route path="/dashboard/offres" element={<Offers />} />
          <Route path="/dashboard/statistiques" element={<Statistics />} />
          <Route path="/dashboard/parametres" element={<Settings />} />
          <Route path="/dashboard/super-admin" element={<SuperAdmin />} />
          
          {/* Dashboard Pro routes */}
          <Route path="/dashboard-pro" element={<DashboardPro />} />
          <Route path="/dashboard-pro/produits" element={<ProProducts />} />
          <Route path="/dashboard-pro/ajouter-produit" element={<ProAddProduct />} />
          <Route path="/dashboard-pro/commandes" element={<ProOrders />} />
          <Route path="/dashboard-pro/offres" element={<ProOffers />} />
          <Route path="/dashboard-pro/statistiques" element={<ProStatistics />} />
          <Route path="/dashboard-pro/parametres" element={<ProSettings />} />
          <Route path="/dashboard-pro/support" element={<ProSupport />} />
          <Route path="/dashboard-pro/marketing" element={<ProMarketing />} />
          <Route path="/dashboard-pro/factures" element={<ProInvoices />} />
          <Route path="/dashboard-pro/avis" element={<ProReviews />} />
          
          {/* Super Admin Dashboard */}
          <Route path="/super-admin" element={<SuperAdminDashboard />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
