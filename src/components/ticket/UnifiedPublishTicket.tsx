
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Euro, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InputField, TextareaField, SelectField } from '@/components/ui/forms/FormField';

interface UnifiedPublishTicketProps {
  isDashboard?: boolean;
  onSuccess?: () => void;
}

const categoryOptions = [
  { value: 'concert', label: 'Concert' },
  { value: 'festival', label: 'Festival' },
  { value: 'theatre', label: 'Théâtre' },
  { value: 'sport', label: 'Sport' },
  { value: 'conference', label: 'Conférence' },
  { value: 'soiree', label: 'Soirée privée' }
];

export const UnifiedPublishTicket: React.FC<UnifiedPublishTicketProps> = ({ 
  isDashboard = false,
  onSuccess 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
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
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Le titre est obligatoire';
    if (!formData.date) newErrors.date = 'La date est obligatoire';
    if (!formData.time) newErrors.time = 'L\'heure est obligatoire';
    if (!formData.location.trim()) newErrors.location = 'Le lieu est obligatoire';
    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Le prix doit être un nombre positif';
    }
    if (!formData.totalTickets || isNaN(Number(formData.totalTickets)) || Number(formData.totalTickets) <= 0) {
      newErrors.totalTickets = 'Le nombre de billets doit être un nombre positif';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulation d'un appel API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Billet publié avec succès",
        description: "Votre événement a été créé et est maintenant disponible à la vente.",
      });
      
      if (onSuccess) {
        onSuccess();
      } else {
        const redirectPath = isDashboard ? '/dashboard/billets' : '/billets-evenements';
        navigate(redirectPath);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la publication.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    const redirectPath = isDashboard ? '/dashboard/billets' : '/billets-evenements';
    navigate(redirectPath);
  };

  return (
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
                <InputField
                  label="Titre de l'événement"
                  id="title"
                  value={formData.title}
                  onChange={(value) => handleInputChange('title', value)}
                  placeholder="Ex: Concert de Jazz au Palais Royal"
                  error={errors.title}
                  required
                />

                <TextareaField
                  label="Description"
                  id="description"
                  value={formData.description}
                  onChange={(value) => handleInputChange('description', value)}
                  placeholder="Décrivez votre événement en détail..."
                  rows={4}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    label="Date"
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(value) => handleInputChange('date', value)}
                    error={errors.date}
                    required
                  />
                  <InputField
                    label="Heure"
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(value) => handleInputChange('time', value)}
                    error={errors.time}
                    required
                  />
                </div>

                <InputField
                  label="Lieu"
                  id="location"
                  value={formData.location}
                  onChange={(value) => handleInputChange('location', value)}
                  placeholder="Ex: Salle Apollo, 8 rue de la Paix, Paris"
                  error={errors.location}
                  required
                />

                <SelectField
                  label="Catégorie"
                  id="category"
                  value={formData.category}
                  onChange={(value) => handleInputChange('category', value)}
                  placeholder="Sélectionnez une catégorie"
                  options={categoryOptions}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputField
                    label="Prix par billet (€)"
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(value) => handleInputChange('price', value)}
                    placeholder="50"
                    min={0}
                    step={0.01}
                    error={errors.price}
                    required
                  />
                  <InputField
                    label="Nombre total de billets"
                    id="totalTickets"
                    type="number"
                    value={formData.totalTickets}
                    onChange={(value) => handleInputChange('totalTickets', value)}
                    placeholder="100"
                    min={1}
                    error={errors.totalTickets}
                    required
                  />
                  <InputField
                    label="Max par personne"
                    id="maxPerPerson"
                    type="number"
                    value={formData.maxPerPerson}
                    onChange={(value) => handleInputChange('maxPerPerson', value)}
                    placeholder="5"
                    min={1}
                  />
                </div>

                <div className="flex items-center justify-end space-x-4 pt-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleCancel}
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
  );
};
