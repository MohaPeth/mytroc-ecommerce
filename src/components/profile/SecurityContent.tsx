
import React, { useState } from 'react';
import { Shield, Lock, Key, Smartphone, AlertCircle, HelpCircle, MessageSquare, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import ChangePasswordModal from './modals/ChangePasswordModal';

const SecurityContent = () => {
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleSupportClick = (type: string) => {
    // Redirection vers les pages appropriées ou ouverture de modals
    switch (type) {
      case 'help':
        window.open('/faq', '_blank');
        break;
      case 'contact':
        window.open('mailto:support@mytroc.com', '_blank');
        break;
      case 'report':
        window.open('/contact?type=report', '_blank');
        break;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sécurité du compte</CardTitle>
          <CardDescription>
            Gérez vos informations de connexion et sécurisez votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-md">
                  <Lock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Mot de passe</p>
                  <p className="text-sm text-gray-600">Dernière modification il y a 3 mois</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setChangePasswordOpen(true)}
              >
                Modifier
              </Button>
            </div>
            
            <div className="flex justify-between items-center p-4 border rounded-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-md">
                  <Key className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Authentification à deux facteurs</p>
                  <p className="text-sm text-gray-600">Sécurisez davantage votre compte</p>
                </div>
              </div>
              <Switch 
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Support et aide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div 
              className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50 cursor-pointer"
              onClick={() => handleSupportClick('help')}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-md">
                  <HelpCircle className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">Centre d'aide</p>
                  <p className="text-sm text-gray-600">Consultez nos guides et FAQ</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            
            <div 
              className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50 cursor-pointer"
              onClick={() => handleSupportClick('contact')}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-md">
                  <MessageSquare className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">Contacter le support</p>
                  <p className="text-sm text-gray-600">Obtenez de l'aide pour votre compte</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
            
            <div 
              className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50 cursor-pointer"
              onClick={() => handleSupportClick('report')}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-md">
                  <AlertCircle className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium">Signaler un problème</p>
                  <p className="text-sm text-gray-600">Signalez-nous tout problème technique</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <ChangePasswordModal 
        open={changePasswordOpen}
        onOpenChange={setChangePasswordOpen}
      />
    </div>
  );
};

export default SecurityContent;
