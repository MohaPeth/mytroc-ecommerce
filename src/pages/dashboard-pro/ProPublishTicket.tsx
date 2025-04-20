
import React from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Clock, Upload, Ticket, Info, CalendarCheck, MapPin } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const ProPublishTicket = () => {
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [publishMode, setPublishMode] = React.useState("single");
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Billet publié avec succès",
      description: "Votre billet a été publié et est maintenant visible aux acheteurs."
    });
  };

  return (
    <ProDashboardLayout title="Publier un billet">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Publier un billet d'événement</h2>
          <p className="text-muted-foreground">Créez une nouvelle annonce pour vos billets d'événements</p>
        </div>

        <Tabs defaultValue="single" onValueChange={setPublishMode}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="single">Billet simple</TabsTrigger>
            <TabsTrigger value="multiple">Billets groupés</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Informations sur l'événement
                  </CardTitle>
                  <CardDescription>
                    Détails essentiels concernant l'événement pour lequel vous vendez des billets
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-name">Nom de l'événement *</Label>
                      <Input id="event-name" placeholder="Ex: Concert de Jazz au Zénith" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-category">Catégorie *</Label>
                      <Select required>
                        <SelectTrigger id="event-category">
                          <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="concert">Concert</SelectItem>
                          <SelectItem value="festival">Festival</SelectItem>
                          <SelectItem value="theatre">Théâtre</SelectItem>
                          <SelectItem value="sport">Événement sportif</SelectItem>
                          <SelectItem value="exposition">Exposition</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-description">Description de l'événement *</Label>
                    <Textarea 
                      id="event-description" 
                      placeholder="Décrivez l'événement en détail..." 
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Date de l'événement *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, 'PPP', { locale: fr }) : <span>Sélectionner une date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-time">Heure de l'événement *</Label>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input id="event-time" type="time" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event-duration">Durée (heures)</Label>
                      <Input id="event-duration" type="number" min="0" step="0.5" placeholder="Ex: 2.5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="event-location">Lieu de l'événement *</Label>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input id="event-location" placeholder="Ex: Zénith de Paris, 211 Avenue Jean Jaurès, 75019 Paris" required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="h-5 w-5" />
                    Informations sur les billets
                  </CardTitle>
                  <CardDescription>
                    Détails sur les billets que vous proposez à la vente
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ticket-type">Type de billet *</Label>
                      <Select required>
                        <SelectTrigger id="ticket-type">
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="vip">VIP</SelectItem>
                          <SelectItem value="premium">Premium</SelectItem>
                          <SelectItem value="early">Early Bird</SelectItem>
                          <SelectItem value="group">Groupe</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ticket-price">Prix unitaire (€) *</Label>
                      <Input id="ticket-price" type="number" min="0" step="0.01" placeholder="Ex: 49.99" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ticket-quantity">Nombre de billets disponibles *</Label>
                      <Input id="ticket-quantity" type="number" min="1" placeholder="Ex: 10" required />
                    </div>
                  </div>

                  {publishMode === "multiple" && (
                    <div className="border rounded-md p-4 bg-muted/40">
                      <h4 className="text-sm font-medium mb-2">Options pour les billets groupés</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="group-size">Taille du groupe</Label>
                          <Input id="group-size" type="number" min="2" placeholder="Ex: 4" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="group-discount">Remise par groupe (%)</Label>
                          <Input id="group-discount" type="number" min="0" max="100" placeholder="Ex: 10" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="ticket-description">Description des billets</Label>
                    <Textarea 
                      id="ticket-description" 
                      placeholder="Décrivez les avantages inclus avec ce type de billet..." 
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="sale-start">Début de la vente</Label>
                      <Input id="sale-start" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sale-end">Fin de la vente</Label>
                      <Input id="sale-end" type="date" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="upload-image">Image de l'événement</Label>
                      <span className="text-xs text-muted-foreground">Recommandé: 1200×800px</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-md p-4 flex flex-col items-center justify-center bg-muted/40 h-40">
                        <Input 
                          id="upload-image" 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                        <Label htmlFor="upload-image" className="cursor-pointer flex flex-col items-center">
                          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                          <span className="text-sm text-muted-foreground">Cliquez pour télécharger</span>
                        </Label>
                      </div>
                      
                      <div className="border rounded-md h-40 flex items-center justify-center overflow-hidden">
                        {previewImage ? (
                          <img 
                            src={previewImage} 
                            alt="Preview" 
                            className="w-full h-full object-cover" 
                          />
                        ) : (
                          <span className="text-sm text-muted-foreground">Aperçu de l'image</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarCheck className="h-5 w-5" />
                    Options de vente
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="featured">Mettre en avant</Label>
                      <p className="text-sm text-muted-foreground">Affiche votre annonce en haut des résultats de recherche</p>
                    </div>
                    <Switch id="featured" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="instant-delivery">Livraison instantanée</Label>
                      <p className="text-sm text-muted-foreground">L'acheteur reçoit ses billets immédiatement après paiement</p>
                    </div>
                    <Switch id="instant-delivery" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="refund">Autoriser les remboursements</Label>
                      <p className="text-sm text-muted-foreground">Les acheteurs peuvent demander un remboursement jusqu'à 7 jours avant l'événement</p>
                    </div>
                    <Switch id="refund" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Enregistrer comme brouillon</Button>
                  <Button type="submit">Publier le billet</Button>
                </CardFooter>
              </Card>
            </div>
          </form>
        </Tabs>
      </div>
    </ProDashboardLayout>
  );
};

export default ProPublishTicket;
