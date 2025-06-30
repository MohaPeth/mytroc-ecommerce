import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
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
import ProductsCRUD from "@/pages/dashboard/ProductsCRUD";
import Orders from "@/pages/dashboard/Orders";
import Offers from "@/pages/dashboard/Offers";
import MyTickets from "@/pages/dashboard/MyTickets";
import Settings from "@/pages/dashboard/Settings";
import Statistics from "@/pages/dashboard/Statistics";
import PerformanceMonitor from "@/pages/dashboard/PerformanceMonitor";
import TestingDashboard from "@/pages/dashboard/TestingDashboard";
import TicketsEvents from "@/pages/TicketsEvents";
import PublishTicketPage from "@/pages/PublishTicket";
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
import EnhancedMyProducts from "@/pages/dashboard/EnhancedMyProducts";
import DashboardPublishTicket from "@/pages/dashboard/PublishTicket";
import DashboardNotifications from "@/pages/dashboard/DashboardNotifications";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      
      {/* Routes boutique */}
      <Route path="/shop" element={<Shop />} />
      <Route path="/boutique" element={<Shop />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/produit/:id" element={<ProductDetail />} />
      
      {/* Routes panier et favoris - Protected */}
      <Route path="/cart" element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      } />
      <Route path="/panier" element={
        <ProtectedRoute>
          <Cart />
        </ProtectedRoute>
      } />
      <Route path="/favorites" element={
        <ProtectedRoute>
          <Favorites />
        </ProtectedRoute>
      } />
      <Route path="/favoris" element={
        <ProtectedRoute>
          <Favorites />
        </ProtectedRoute>
      } />
      
      {/* Routes profil et compte - Protected */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/profil" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/orders/:id" element={
        <ProtectedRoute>
          <OrderDetails />
        </ProtectedRoute>
      } />
      <Route path="/commande/:id" element={
        <ProtectedRoute>
          <OrderDetails />
        </ProtectedRoute>
      } />
      <Route path="/commandes" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/notifications" element={
        <ProtectedRoute>
          <Notifications />
        </ProtectedRoute>
      } />
      
      {/* Routes informations */}
      <Route path="/faq" element={<FAQ />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/avis" element={<Reviews />} />
      <Route path="/seller/:id" element={<SellerStore />} />
      <Route path="/vendeur/:id" element={<SellerStore />} />
      
      {/* Auth routes - Redirect if logged in */}
      <Route path="/auth/login" element={
        <ProtectedRoute requireAuth={false}>
          <Login />
        </ProtectedRoute>
      } />
      <Route path="/auth/connexion" element={
        <ProtectedRoute requireAuth={false}>
          <Login />
        </ProtectedRoute>
      } />
      <Route path="/auth/register" element={
        <ProtectedRoute requireAuth={false}>
          <Register />
        </ProtectedRoute>
      } />
      <Route path="/auth/inscription" element={
        <ProtectedRoute requireAuth={false}>
          <Register />
        </ProtectedRoute>
      } />
      <Route path="/auth/reset-password" element={
        <ProtectedRoute requireAuth={false}>
          <ResetPassword />
        </ProtectedRoute>
      } />
      <Route path="/auth/mot-de-passe-oublie" element={
        <ProtectedRoute requireAuth={false}>
          <ResetPassword />
        </ProtectedRoute>
      } />
      
      {/* Checkout routes - Protected */}
      <Route path="/checkout" element={
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      } />
      <Route path="/commande-checkout" element={
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      } />
      <Route path="/checkout/informations" element={
        <ProtectedRoute>
          <PersonalInfo />
        </ProtectedRoute>
      } />
      <Route path="/checkout/livraison" element={
        <ProtectedRoute>
          <DeliveryDetails />
        </ProtectedRoute>
      } />
      <Route path="/checkout/confirmation" element={
        <ProtectedRoute>
          <Confirmation />
        </ProtectedRoute>
      } />
      <Route path="/checkout/merci" element={
        <ProtectedRoute>
          <ThankYou />
        </ProtectedRoute>
      } />
      
      {/* Dashboard routes - Protected */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/tableau-de-bord" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/products" element={
        <ProtectedRoute>
          <EnhancedMyProducts />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/produits" element={
        <ProtectedRoute>
          <EnhancedMyProducts />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/products-crud" element={
        <ProtectedRoute>
          <ProductsCRUD />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/add-product" element={
        <ProtectedRoute>
          <AddProduct />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/ajouter-produit" element={
        <ProtectedRoute>
          <AddProduct />
        </ProtectedRoute>
      } />
      
      <Route path="/dashboard/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="/dashboard/commandes" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="/dashboard/offers" element={<ProtectedRoute><Offers /></ProtectedRoute>} />
      <Route path="/dashboard/offres" element={<ProtectedRoute><Offers /></ProtectedRoute>} />
      <Route path="/dashboard/tickets" element={<ProtectedRoute><MyTickets /></ProtectedRoute>} />
      <Route path="/dashboard/billets" element={<ProtectedRoute><MyTickets /></ProtectedRoute>} />
      <Route path="/dashboard/publish-ticket" element={<ProtectedRoute><DashboardPublishTicket /></ProtectedRoute>} />
      <Route path="/dashboard/publier-billet" element={<ProtectedRoute><DashboardPublishTicket /></ProtectedRoute>} />
      <Route path="/dashboard/notifications" element={<ProtectedRoute><DashboardNotifications /></ProtectedRoute>} />
      <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/dashboard/parametres" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/dashboard/statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
      <Route path="/dashboard/statistiques" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
      <Route path="/dashboard/performance" element={<ProtectedRoute><PerformanceMonitor /></ProtectedRoute>} />
      <Route path="/dashboard/testing" element={<ProtectedRoute><TestingDashboard /></ProtectedRoute>} />
      
      {/* Events routes */}
      <Route path="/events" element={<TicketsEvents />} />
      <Route path="/evenements" element={<TicketsEvents />} />
      <Route path="/billets-evenements" element={<TicketsEvents />} />
      <Route path="/events/publish" element={<ProtectedRoute><PublishTicketPage /></ProtectedRoute>} />
      <Route path="/evenements/publier" element={<ProtectedRoute><PublishTicketPage /></ProtectedRoute>} />
      <Route path="/events/:id" element={<TicketDetail />} />
      <Route path="/evenements/:id" element={<TicketDetail />} />
      
      {/* Pro Dashboard routes - Protected */}
      <Route path="/dashboard-pro" element={<ProtectedRoute><DashboardPro /></ProtectedRoute>} />
      <Route path="/tableau-de-bord-pro" element={<ProtectedRoute><DashboardPro /></ProtectedRoute>} />
      <Route path="/dashboard-pro/products" element={<ProtectedRoute><ProProducts /></ProtectedRoute>} />
      <Route path="/dashboard-pro/produits" element={<ProtectedRoute><ProProducts /></ProtectedRoute>} />
      <Route path="/dashboard-pro/add-product" element={<ProtectedRoute><ProAddProduct /></ProtectedRoute>} />
      <Route path="/dashboard-pro/ajouter-produit" element={<ProtectedRoute><ProAddProduct /></ProtectedRoute>} />
      <Route path="/dashboard-pro/orders" element={<ProtectedRoute><ProOrders /></ProtectedRoute>} />
      <Route path="/dashboard-pro/commandes" element={<ProtectedRoute><ProOrders /></ProtectedRoute>} />
      <Route path="/dashboard-pro/offers" element={<ProtectedRoute><ProOffers /></ProtectedRoute>} />
      <Route path="/dashboard-pro/offres" element={<ProtectedRoute><ProOffers /></ProtectedRoute>} />
      <Route path="/dashboard-pro/commissions" element={<ProtectedRoute><ProCommissions /></ProtectedRoute>} />
      <Route path="/dashboard-pro/invoices" element={<ProtectedRoute><ProInvoices /></ProtectedRoute>} />
      <Route path="/dashboard-pro/factures" element={<ProtectedRoute><ProInvoices /></ProtectedRoute>} />
      <Route path="/dashboard-pro/tickets" element={<ProtectedRoute><ProTickets /></ProtectedRoute>} />
      <Route path="/dashboard-pro/billets" element={<ProtectedRoute><ProTickets /></ProtectedRoute>} />
      <Route path="/dashboard-pro/publish-ticket" element={<ProtectedRoute><ProPublishTicket /></ProtectedRoute>} />
      <Route path="/dashboard-pro/publier-billet" element={<ProtectedRoute><ProPublishTicket /></ProtectedRoute>} />
      <Route path="/dashboard-pro/statistics" element={<ProtectedRoute><ProStatistics /></ProtectedRoute>} />
      <Route path="/dashboard-pro/statistiques" element={<ProtectedRoute><ProStatistics /></ProtectedRoute>} />
      <Route path="/dashboard-pro/reviews" element={<ProtectedRoute><ProReviews /></ProtectedRoute>} />
      <Route path="/dashboard-pro/avis" element={<ProtectedRoute><ProReviews /></ProtectedRoute>} />
      <Route path="/dashboard-pro/marketing" element={<ProtectedRoute><ProMarketing /></ProtectedRoute>} />
      <Route path="/dashboard-pro/settings" element={<ProtectedRoute><ProSettings /></ProtectedRoute>} />
      <Route path="/dashboard-pro/parametres" element={<ProtectedRoute><ProSettings /></ProtectedRoute>} />
      <Route path="/dashboard-pro/support" element={<ProtectedRoute><ProSupport /></ProtectedRoute>} />
      
      {/* Super Admin routes - Protected */}
      <Route path="/super-admin" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
      <Route path="/administration" element={<ProtectedRoute><SuperAdminDashboard /></ProtectedRoute>} />
      
      {/* Error routes */}
      <Route path="/error/500" element={<ServerError />} />
      <Route path="/erreur/500" element={<ServerError />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
