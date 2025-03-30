
import React from 'react';
import { 
  Lock,
  RefreshCw,
  Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const SuperAdminSecurity = () => {
  // Fonction pour activer l'authentification à deux facteurs
  const handle2FAToggle = (enabled: boolean) => {
    toast({
      title: enabled ? "2FA Activé" : "2FA Désactivé",
      description: enabled 
        ? "L'authentification à deux facteurs a été activée." 
        : "L'authentification à deux facteurs a été désactivée.",
      variant: enabled ? "default" : "destructive",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Paramètres de Sécurité</CardTitle>
        <CardDescription>Sécurisez votre plateforme avec des mesures de protection avancées</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Authentification</h3>
          <Separator />

          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="2fa">Authentification à deux facteurs (2FA)</Label>
                <p className="text-sm text-muted-foreground">
                  Exiger une authentification à deux facteurs pour tous les comptes administrateurs
                </p>
              </div>
              <Switch id="2fa" onCheckedChange={handle2FAToggle} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="session-timeout">Expiration de session</Label>
                <p className="text-sm text-muted-foreground">
                  Déconnecter automatiquement les utilisateurs après une période d'inactivité
                </p>
              </div>
              <Select defaultValue="30">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sélectionnez" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 heure</SelectItem>
                  <SelectItem value="120">2 heures</SelectItem>
                  <SelectItem value="never">Jamais</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Journalisation et Audit</h3>
          <Separator />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Action</TableHead>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Date et heure</TableHead>
                  <TableHead>Adresse IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Connexion Super Admin</TableCell>
                  <TableCell>Thomas Leroy</TableCell>
                  <TableCell>2023-05-24 14:32:15</TableCell>
                  <TableCell>192.168.1.1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Modification paramètres système</TableCell>
                  <TableCell>Jean Dupont</TableCell>
                  <TableCell>2023-05-24 10:12:08</TableCell>
                  <TableCell>192.168.1.2</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Suspension compte utilisateur</TableCell>
                  <TableCell>Thomas Leroy</TableCell>
                  <TableCell>2023-05-23 16:45:22</TableCell>
                  <TableCell>192.168.1.1</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Télécharger l'historique complet
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Contrôles avancés</h3>
          <Separator />

          <div className="grid gap-4">
            <Button className="gap-2 bg-red-500 hover:bg-red-600 w-full sm:w-auto">
              <Lock className="h-4 w-4" />
              Verrouiller tous les comptes administrateurs
            </Button>
            
            <Button variant="outline" className="gap-2 border-amber-500 text-amber-500 hover:bg-amber-50 w-full sm:w-auto">
              <RefreshCw className="h-4 w-4" />
              Réinitialiser toutes les clés API
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuperAdminSecurity;
