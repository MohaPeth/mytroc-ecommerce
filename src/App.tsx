
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
          <Route path="/checkout" element={<Checkout />}>
            <Route path="informations" element={<PersonalInfo />} />
            <Route path="livraison" element={<DeliveryDetails />} />
            <Route path="confirmation" element={<Confirmation />} />
          </Route>
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<NotFound />} /> {/* Placeholder until we create a profile page */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
