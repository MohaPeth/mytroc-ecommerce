import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from '@/components/ErrorBoundary';

// Imports
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Dashboard from './pages/dashboard/Dashboard';
import MyProducts from './pages/dashboard/MyProducts';
import AddProduct from './pages/dashboard/AddProduct';
import EditProduct from './pages/dashboard/EditProduct';
import Orders from './pages/dashboard/Orders';
import Settings from './pages/dashboard/Settings';
import ProDashboard from './pages/dashboard-pro/ProDashboard';
import ProProducts from './pages/dashboard-pro/ProProducts';
import ProAddProduct from './pages/dashboard-pro/ProAddProduct';
import ProEditProduct from './pages/dashboard-pro/ProEditProduct';
import SuperAdminDashboard from './pages/super-admin/SuperAdminDashboard';
import SuperAdminProducts from './pages/super-admin/components/SuperAdminProducts';
import SuperAdminUsers from './pages/super-admin/components/SuperAdminUsers';
import SuperAdminCategories from './pages/super-admin/components/SuperAdminCategories';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Support from './pages/Support';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

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
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/produit/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/support" element={<Support />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />

              {/* User Dashboard Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/mes-produits" element={<MyProducts />} />
              <Route path="/dashboard/ajouter-produit" element={<AddProduct />} />
              <Route path="/dashboard/modifier-produit/:id" element={<EditProduct />} />
              <Route path="/dashboard/commandes" element={<Orders />} />
              <Route path="/dashboard/settings" element={<Settings />} />

              {/* Pro Dashboard Routes */}
              <Route path="/dashboard-pro" element={<ProDashboard />} />
              <Route path="/dashboard-pro/mes-produits" element={<ProProducts />} />
              <Route path="/dashboard-pro/ajouter-produit" element={<ProAddProduct />} />
              <Route path="/dashboard-pro/modifier-produit/:id" element={<ProEditProduct />} />

              {/* Super Admin Routes */}
              <Route path="/super-admin" element={<SuperAdminDashboard />} />
              <Route path="/super-admin/products" element={<SuperAdminProducts />} />
              <Route path="/super-admin/users" element={<SuperAdminUsers />} />
              <Route path="/super-admin/categories" element={<SuperAdminCategories />} />
              
              {/* Pages d'erreur */}
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
