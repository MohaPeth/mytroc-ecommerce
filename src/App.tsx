
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
import NotFound from "@/pages/error/NotFound";
import ServerError from "@/pages/error/ServerError";
import { usePageTracking } from "@/hooks/usePageTracking";

const queryClient = new QueryClient();

// Composant wrapper pour le tracking
const AppWithTracking = () => {
  usePageTracking(); // Track automatiquement les changements de page
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/seller/:id" element={<SellerStore />} />
        
        {/* Auth routes */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/reset-password" element={<ResetPassword />} />
        
        {/* Checkout routes */}
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/informations" element={<PersonalInfo />} />
        <Route path="/checkout/livraison" element={<DeliveryDetails />} />
        <Route path="/checkout/confirmation" element={<Confirmation />} />
        <Route path="/checkout/merci" element={<ThankYou />} />
        
        {/* Dashboard routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/products" element={<MyProducts />} />
        <Route path="/dashboard/add-product" element={<AddProduct />} />
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route path="/dashboard/offers" element={<Offers />} />
        <Route path="/dashboard/tickets" element={<MyTickets />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/statistics" element={<Statistics />} />
        <Route path="/dashboard/performance" element={<PerformanceMonitor />} />
        <Route path="/dashboard/testing" element={<TestingDashboard />} />
        
        {/* Events routes */}
        <Route path="/events" element={<TicketsEvents />} />
        <Route path="/events/publish" element={<PublishTicket />} />
        <Route path="/events/:id" element={<TicketDetail />} />
        
        {/* Pro Dashboard routes */}
        <Route path="/dashboard-pro" element={<DashboardPro />} />
        <Route path="/dashboard-pro/products" element={<ProProducts />} />
        <Route path="/dashboard-pro/add-product" element={<ProAddProduct />} />
        <Route path="/dashboard-pro/orders" element={<ProOrders />} />
        <Route path="/dashboard-pro/offers" element={<ProOffers />} />
        <Route path="/dashboard-pro/commissions" element={<ProCommissions />} />
        <Route path="/dashboard-pro/invoices" element={<ProInvoices />} />
        
        {/* Error routes */}
        <Route path="/error/500" element={<ServerError />} />
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
