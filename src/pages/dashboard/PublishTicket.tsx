
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Users, Euro, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const PublishTicket = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    category: '',
    price: '',
    totalTickets: '',
    maxPerPerson: '5'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'un appel API
    setTimeout(() => {
      toast({
        title: "Billet publié avec succès",
        description: "Votre événement a été créé et est maintenant disponible à la vente.",
      });
      setIsLoading(false);
      navigate('/dashboard/billets');
    }, 2000);
  };

  return (
    <DashboardLayout title="Publier un billet">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Créer un nouvel événement</h1>
          <p className="text-muted-foreground">
            Créez votre événement et mettez vos billets en vente
          </p>
        </div>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Information importante</AlertTitle>
          <AlertDescription>
            Assurez-vous que toutes les informations sont correctes avant de publier votre événement.
            Une fois publié, certains détails ne pourront plus être modifiés.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informations de l'événement</CardTitle>
                <CardDescription>
                  Remplissez les détails de votre événement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre de l'événement *</Label>
                    <Input 
                      id="title" 
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Ex: Concert de Jazz au Palais Royal" 
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description" 
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Décrivez votre événement en détail..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input 
                        id="date" 
                        type="date" 
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Heure *</Label>
                      <Input 
                        id="time" 
                        type="time" 
                        value={formData.time}
                        onChange={(e) => handleInputChange('time', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Lieu *</Label>
                    <Input 
                      id="location" 
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Ex: Salle Apollo, 8 rue de la Paix, Paris" 
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleInputChange('category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="concert">Concert</SelectItem>
                        <SelectItem value="festival">Festival</SelectItem>
                        <SelectItem value="theatre">Théâtre</SelectItem>
                        <SelectItem value="sport">Sport</SelectItem>
                        <SelectItem value="conference">Conférence</SelectItem>
                        <SelectItem value="soiree">Soirée privée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Prix par billet (€) *</Label>
                      <Input 
                        id="price" 
                        type="number" 
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        placeholder="50" 
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="total-tickets">Nombre total de billets *</Label>
                      <Input 
                        id="total-tickets" 
                        type="number" 
                        value={formData.totalTickets}
                        onChange={(e) => handleInputChange('totalTickets', e.target.value)}
                        placeholder="100" 
                        min="1"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-per-person">Max par personne</Label>
                      <Input 
                        id="max-per-person" 
                        type="number" 
                        value={formData.maxPerPerson}
                        onChange={(e) => handleInputChange('maxPerPerson', e.target.value)}
                        placeholder="5" 
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => navigate('/dashboard/billets')}
                    >
                      Annuler
                    </Button>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? "Publication..." : "Publier l'événement"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Aperçu */}
            <Card>
              <CardHeader>
                <CardTitle>Aperçu</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{formData.date && formData.time ? `${formData.date} à ${formData.time}` : "Date à définir"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{formData.location || "Lieu à définir"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>Places disponibles: {formData.totalTickets || "-"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <Euro className="h-4 w-4" />
                  <span>Prix: {formData.price ? `${formData.price} €` : "- €"}</span>
                </div>
              </CardContent>
            </Card>

            {/* Conseils */}
            <Card>
              <CardHeader>
                <CardTitle>Conseils</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Utilisez un titre accrocheur et descriptif</p>
                <p>• Ajoutez une description détaillée avec les informations importantes</p>
                <p>• Vérifiez deux fois la date et l'heure</p>
                <p>• Indiquez l'adresse complète du lieu</p>
                <p>• Fixez un prix compétitif selon votre marché</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PublishTicket;
