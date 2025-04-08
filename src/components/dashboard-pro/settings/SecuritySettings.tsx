
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface SecuritySettingsProps {
  onSave: () => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ onSave }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sécurité du compte</CardTitle>
        <CardDescription>
          Gérez la sécurité de votre compte vendeur
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Mot de passe</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mot de passe actuel</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div></div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input id="confirmPassword" type="password" />
            </div>
          </div>
          <Button variant="outline">Changer le mot de passe</Button>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Authentification à deux facteurs</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="twoFactor">Activer l'authentification à deux facteurs</Label>
              <p className="text-sm text-muted-foreground">
                Ajoutez une couche de sécurité supplémentaire à votre compte
              </p>
            </div>
            <Switch id="twoFactor" />
          </div>
          <Button variant="outline" disabled>Configurer l'authentification à deux facteurs</Button>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Sessions actives</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Chrome sur Windows</p>
                  <p className="text-sm text-muted-foreground">Paris, France • Dernière activité: il y a 2 minutes</p>
                </div>
                <Badge>Actuelle</Badge>
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Safari sur iPhone</p>
                  <p className="text-sm text-muted-foreground">Paris, France • Dernière activité: hier</p>
                </div>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">Déconnecter</Button>
              </div>
            </div>
          </div>
          <Button variant="outline">Déconnecter toutes les autres sessions</Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onSave}>Enregistrer les modifications</Button>
      </CardFooter>
    </Card>
  );
};

export default SecuritySettings;
