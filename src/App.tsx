import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
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
