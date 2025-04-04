
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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

const Profile = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");

  // Update activeTab if provided in location state
  useEffect(() => {
    if (location.state && location.state.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-16 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Mon compte</h1>
          
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
