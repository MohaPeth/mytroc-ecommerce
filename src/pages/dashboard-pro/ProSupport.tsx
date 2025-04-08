
import React, { useState } from 'react';
import ProDashboardLayout from '@/components/dashboard-pro/ProDashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Clock, HelpCircle, MessageSquare, Phone, Video, Mail, FileText, User, FileQuestion, CheckCircle2, XCircle, ClipboardCheck } from 'lucide-react';

const ProSupport = () => {
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const { toast } = useToast();
  
  // Exemple de tickets de support
  const supportTickets = [
    {
      id: 1,
      subject: "Problème avec le paiement",
      status: "open",
      priority: "high",
      date: "2023-06-10T14:32:00",
      lastUpdate: "2023-06-11T09:15:00",
      category: "payment",
      messages: [
        {
          sender: "me",
          text: "Bonjour, j'ai un problème avec le système de paiement. Les clients ne peuvent pas finaliser leurs commandes depuis hier soir.",
          time: "2023-06-10T14:32:00"
        },
        {
          sender: "support",
          text: "Bonjour, nous sommes désolés pour ce désagrément. Pouvez-vous nous préciser quelles erreurs les clients rencontrent exactement ?",
          time: "2023-06-10T14:45:00"
        },
        {
          sender: "me",
          text: "Ils reçoivent un message 'Transaction refusée' quand ils essaient de payer par carte.",
          time: "2023-06-10T15:01:00"
        },
        {
          sender: "support",
          text: "Merci pour ces précisions. Nous allons vérifier cela immédiatement et revenir vers vous dans les plus brefs délais.",
          time: "2023-06-10T15:10:00"
        }
      ]
    },
    {
      id: 2,
      subject: "Question sur les frais de livraison",
      status: "closed",
      priority: "medium",
      date: "2023-06-05T10:22:00",
      lastUpdate: "2023-06-07T16:40:00",
      category: "shipping",
      messages: [
        {
          sender: "me",
          text: "Bonjour, comment puis-je proposer différents tarifs de livraison en fonction du poids des produits ?",
          time: "2023-06-05T10:22:00"
        },
        {
          sender: "support",
          text: "Bonjour, vous pouvez configurer des règles de livraison basées sur le poids dans les paramètres de votre boutique. Souhaitez-vous que je vous guide étape par étape ?",
          time: "2023-06-05T10:45:00"
        }
      ]
    },
    {
      id: 3,
      subject: "Demande de formation marketing",
      status: "pending",
      priority: "normal",
      date: "2023-06-08T09:15:00",
      lastUpdate: "2023-06-08T14:30:00",
      category: "training",
      messages: [
        {
          sender: "me",
          text: "Bonjour, je souhaite bénéficier d'une formation pour mieux utiliser les outils marketing de la plateforme.",
          time: "2023-06-08T09:15:00"
        },
        {
          sender: "support",
          text: "Bonjour, nous proposons différentes formations pour les vendeurs premium. Seriez-vous disponible pour un webinaire la semaine prochaine ?",
          time: "2023-06-08T09:45:00"
        }
      ]
    }
  ];

  const handleNewTicket = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Ticket créé",
      description: "Votre demande a bien été envoyée. Un conseiller vous répondra dans les 15 minutes.",
    });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé. Un conseiller vous répondra rapidement.",
    });
  };

  return (
    <ProDashboardLayout title="Support H24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Assistance Premium 24/7</h1>
        <p className="text-muted-foreground">
          Bénéficiez d'une assistance personnalisée et prioritaire à tout moment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Colonnes de gauche (1/3) - Options de contact */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                <span>Assistance prioritaire</span>
              </CardTitle>
              <CardDescription>
                Temps de réponse moyen: <strong>15 minutes</strong>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">3 conseillers en ligne</span>
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                  Disponible 24/7
                </Badge>
              </div>
              
              <p className="text-sm">
                En tant que vendeur premium, vous bénéficiez d'un accès prioritaire à notre équipe de support technique et commercial.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contacter le support</CardTitle>
              <CardDescription>
                Choisissez votre mode de contact préféré
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat en direct
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Phone className="mr-2 h-4 w-4" />
                Appel téléphonique
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Video className="mr-2 h-4 w-4" />
                Vidéoconférence
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Email prioritaire
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>
                Guides et ressources utiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="link" className="w-full justify-start p-0 h-auto">
                <FileText className="mr-2 h-4 w-4" />
                Guide du vendeur premium
              </Button>
              <Button variant="link" className="w-full justify-start p-0 h-auto">
                <ClipboardCheck className="mr-2 h-4 w-4" />
                Bonnes pratiques
              </Button>
              <Button variant="link" className="w-full justify-start p-0 h-auto">
                <FileQuestion className="mr-2 h-4 w-4" />
                FAQ vendeurs
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Colonne de droite (2/3) - Système de tickets */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="tickets">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="tickets">Mes tickets</TabsTrigger>
              <TabsTrigger value="new-ticket">Nouveau ticket</TabsTrigger>
              <TabsTrigger value="training">Formations</TabsTrigger>
            </TabsList>

            {/* Onglet Mes tickets */}
            <TabsContent value="tickets" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Historique de mes demandes</CardTitle>
                  <CardDescription>
                    Consultez et suivez l'état de vos demandes de support
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {supportTickets.map(ticket => (
                      <div key={ticket.id} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{ticket.subject}</h3>
                            <p className="text-sm text-muted-foreground">
                              ID: #{ticket.id} • {new Date(ticket.date).toLocaleDateString()} • {ticket.messages.length} messages
                            </p>
                          </div>
                          <Badge className={
                            ticket.status === 'open' ? 'bg-blue-500' : 
                            ticket.status === 'pending' ? 'bg-amber-500' : 
                            'bg-green-500'
                          }>
                            {ticket.status === 'open' ? 'En cours' : 
                             ticket.status === 'pending' ? 'En attente' : 
                             'Résolu'}
                          </Badge>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <Badge variant="outline" className={
                            ticket.priority === 'high' ? 'border-red-200 text-red-600' : 
                            ticket.priority === 'medium' ? 'border-amber-200 text-amber-600' : 
                            'border-blue-200 text-blue-600'
                          }>
                            {ticket.priority === 'high' ? 'Priorité haute' : 
                             ticket.priority === 'medium' ? 'Priorité moyenne' : 
                             'Priorité normale'}
                          </Badge>
                          <Dialog onOpenChange={(open) => open && setSelectedTicket(ticket.id)}>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">Voir les détails</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle className="flex justify-between">
                                  <span>{ticket.subject}</span>
                                  <Badge className={
                                    ticket.status === 'open' ? 'bg-blue-500' : 
                                    ticket.status === 'pending' ? 'bg-amber-500' : 
                                    'bg-green-500'
                                  }>
                                    {ticket.status === 'open' ? 'En cours' : 
                                    ticket.status === 'pending' ? 'En attente' : 
                                    'Résolu'}
                                  </Badge>
                                </DialogTitle>
                                <DialogDescription>
                                  ID: #{ticket.id} • Créé le {new Date(ticket.date).toLocaleDateString()} • Dernière mise à jour: {new Date(ticket.lastUpdate).toLocaleDateString()}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 my-4 max-h-96 overflow-y-auto">
                                {ticket.messages.map((message, idx) => (
                                  <div key={idx} className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'me' ? 'bg-mytroc-primary/10 text-mytroc-primary' : 'bg-gray-100'}`}>
                                      <div className="flex items-center mb-1">
                                        {message.sender !== 'me' && (
                                          <Avatar className="h-6 w-6 mr-2">
                                            <AvatarFallback>CS</AvatarFallback>
                                          </Avatar>
                                        )}
                                        <span className="text-xs font-medium">
                                          {message.sender === 'me' ? 'Vous' : 'Support MyTroc'}
                                        </span>
                                        {message.sender === 'me' && (
                                          <Avatar className="h-6 w-6 ml-2">
                                            <AvatarFallback>Vous</AvatarFallback>
                                          </Avatar>
                                        )}
                                      </div>
                                      <p className="text-sm">{message.text}</p>
                                      <p className="text-xs text-right mt-1 text-muted-foreground">
                                        {new Date(message.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              {ticket.status !== 'closed' && (
                                <form onSubmit={handleSendMessage} className="mt-4">
                                  <div className="space-y-2">
                                    <Textarea 
                                      placeholder="Écrivez votre réponse ici..." 
                                      className="min-h-20"
                                    />
                                    <div className="flex justify-between">
                                      <Button type="button" variant="outline">Joindre un fichier</Button>
                                      <Button type="submit">Envoyer</Button>
                                    </div>
                                  </div>
                                </form>
                              )}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Nouveau ticket */}
            <TabsContent value="new-ticket" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Créer une nouvelle demande</CardTitle>
                  <CardDescription>
                    Notre équipe de support vous répondra en priorité
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNewTicket} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet</Label>
                      <Input id="subject" placeholder="Titre de votre demande" required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Catégorie</Label>
                        <Select defaultValue="technical">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="technical">Problème technique</SelectItem>
                            <SelectItem value="payment">Paiement</SelectItem>
                            <SelectItem value="shipping">Livraison</SelectItem>
                            <SelectItem value="account">Compte</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="other">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="priority">Priorité</Label>
                        <Select defaultValue="normal">
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une priorité" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">Haute</SelectItem>
                            <SelectItem value="normal">Normale</SelectItem>
                            <SelectItem value="low">Basse</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        placeholder="Décrivez votre problème en détail..." 
                        className="min-h-32"
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Pièces jointes (facultatif)</Label>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center">
                        <Button variant="outline" type="button">Ajouter des fichiers</Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          PNG, JPG, PDF jusqu'à 10MB
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <Button type="submit">Soumettre la demande</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Onglet Formations */}
            <TabsContent value="training" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Formations exclusives</CardTitle>
                  <CardDescription>
                    Formations dédiées aux vendeurs premium pour optimiser vos ventes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Maximiser vos ventes sur MyTroc</h3>
                        <Badge className="bg-green-500">Disponible</Badge>
                      </div>
                      <p className="text-sm mt-2">
                        Apprenez à optimiser vos fiches produits, utiliser les outils marketing et améliorer votre taux de conversion.
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            60 minutes
                          </span>
                        </div>
                        <Button size="sm">S'inscrire</Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Gestion efficace des stocks et des commandes</h3>
                        <Badge className="bg-amber-500">En préparation</Badge>
                      </div>
                      <p className="text-sm mt-2">
                        Découvrez comment gérer vos stocks, automatiser vos processus et optimiser votre logistique.
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            45 minutes
                          </span>
                        </div>
                        <Button size="sm" variant="outline">Être notifié</Button>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">Stratégies de tarification avancées</h3>
                        <Badge className="bg-green-500">Disponible</Badge>
                      </div>
                      <p className="text-sm mt-2">
                        Maîtrisez les techniques de pricing, les offres spéciales et les promotions saisonnières.
                      </p>
                      <div className="mt-4 flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            50 minutes
                          </span>
                        </div>
                        <Button size="sm">S'inscrire</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">Voir toutes les formations</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProDashboardLayout>
  );
};

export default ProSupport;
