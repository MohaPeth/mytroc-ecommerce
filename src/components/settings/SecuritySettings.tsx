
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { LockIcon } from 'lucide-react';

const SecuritySettings = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique pour mettre à jour le mot de passe
    alert('Mot de passe mis à jour');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-2">
        <LockIcon className="h-5 w-5 text-mytroc-primary" />
        <h2 className="text-xl font-semibold">Sécurité</h2>
      </div>
      <p className="text-gray-500 mb-6">Gérez votre mot de passe et la sécurité du compte</p>
      
      <form onSubmit={handleUpdatePassword} className="space-y-4">
        <h3 className="font-medium mb-4">Mot de passe actuel</h3>
        <div className="space-y-2">
          <Input 
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full"
          />
        </div>
        
        <h3 className="font-medium mb-4 pt-2">Nouveau mot de passe</h3>
        <div className="space-y-2">
          <Input 
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full"
          />
        </div>
        
        <h3 className="font-medium mb-4 pt-2">Confirmer le nouveau mot de passe</h3>
        <div className="space-y-2">
          <Input 
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full"
          />
        </div>
        
        <Button 
          type="submit" 
          className="mt-6 bg-green-600 hover:bg-green-700 transition-colors"
        >
          Mettre à jour le mot de passe
        </Button>
      </form>
      
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="font-medium mb-6">Vérification en deux étapes</h3>
        <div className="flex items-start gap-3">
          <div className="pt-1">
            <Switch 
              checked={twoFactorEnabled} 
              onCheckedChange={setTwoFactorEnabled} 
            />
          </div>
          <div>
            <p className="font-medium">Protection supplémentaire de votre compte</p>
            <p className="text-sm text-gray-500 my-1">
              Nous vous enverrons un code de vérification par SMS lors de la connexion.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              disabled={!twoFactorEnabled}
            >
              Configurer
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SecuritySettings;
