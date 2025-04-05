
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/footer";
import AssistanceButton from "@/components/AssistanceButton";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileContent from "@/components/profile/ProfileContent";
import OrdersContent from "@/components/profile/OrdersContent";
import OffersContent from "@/components/profile/OffersContent";
import PaymentContent from "@/components/profile/PaymentContent";
import NotificationsContent from "@/components/profile/NotificationsContent";
import SecurityContent from "@/components/profile/SecurityContent";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState<any>(null);

  // Update activeTab if provided in location state
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }

    // Récupérer les données utilisateur du localStorage
    const storedUser = localStorage.getItem("mytroc-user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, [location.state]);

  // Fonction de déconnexion
  const handleLogout = () => {
    // Supprimer les données de l'utilisateur du localStorage
    localStorage.removeItem("mytroc-user");
    
    // Afficher un toast de confirmation
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    });
    
    // Rediriger vers la page de connexion
    navigate("/auth/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Mon compte</h1>
            <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut size={16} />
              <span>Déconnexion</span>
            </Button>
          </div>
          
          <div className="space-y-6">
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <div className="mt-6">
              {activeTab === "profile" && <ProfileContent />}
              {activeTab === "orders" && <OrdersContent />}
              {activeTab === "offers" && <OffersContent />}
              {activeTab === "payment" && <PaymentContent />}
              {activeTab === "notifications" && <NotificationsContent />}
              {activeTab === "security" && <SecurityContent />}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AssistanceButton />
    </div>
  );
};

export default Profile;
