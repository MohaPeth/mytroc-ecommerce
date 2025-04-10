
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import SearchResults from './pages/SearchResults';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import About from './pages/About';
import CGV from './pages/CGV';
import LegalMentions from './pages/LegalMentions';
import Error404 from './pages/Error404';
import Dashboard from './pages/Dashboard';
import ProDashboard from './pages/dashboard-pro/ProDashboard';
import ProSettings from './pages/dashboard-pro/ProSettings';
import SellerStore from "./pages/SellerStore";

// Create a simple Home component
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur notre plateforme</h1>
      <p className="text-lg text-center max-w-2xl mb-8">
        Découvrez notre marketplace et trouvez des produits de qualité proposés par nos vendeurs certifiés.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Produits variés</h2>
          <p>Explorez notre large sélection de produits dans différentes catégories.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Vendeurs certifiés</h2>
          <p>Tous nos vendeurs sont vérifiés pour garantir la qualité et la confiance.</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Livraison rapide</h2>
          <p>Profitez de notre service de livraison rapide partout au Gabon.</p>
        </div>
      </div>
    </div>
  );
};

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produit/:id" element={<ProductDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/recherche" element={<SearchResults />} />
        <Route path="/auth/:type" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/cgv" element={<CGV />} />
        <Route path="/mentions-legales" element={<LegalMentions />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard-pro" element={<ProDashboard />} />
        <Route path="/dashboard-pro/settings" element={<ProSettings />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/vendeur/:id" element={<SellerStore />} />
      </Routes>
    </Router>
  );
}

export default App;
