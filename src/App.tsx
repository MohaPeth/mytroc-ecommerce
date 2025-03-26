
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/checkout/Checkout";
import DeliveryDetails from "./pages/checkout/DeliveryDetails";
import PersonalInfo from "./pages/checkout/PersonalInfo";
import Confirmation from "./pages/checkout/Confirmation";
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
import Statistics from "./pages/dashboard/Statistics";
import Settings from "./pages/dashboard/Settings";
import Cart from "./pages/Cart";

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
          <Route path="/checkout" element={<Checkout />}>
            <Route path="informations" element={<PersonalInfo />} />
            <Route path="livraison" element={<DeliveryDetails />} />
            <Route path="confirmation" element={<Confirmation />} />
          </Route>
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/faq" element={<FAQ />} />
          {/* Dashboard routes */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/produits" element={<MyProducts />} />
          <Route path="/dashboard/ajouter-produit" element={<AddProduct />} />
          <Route path="/dashboard/commandes" element={<Orders />} />
          <Route path="/dashboard/statistiques" element={<Statistics />} />
          <Route path="/dashboard/parametres" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
