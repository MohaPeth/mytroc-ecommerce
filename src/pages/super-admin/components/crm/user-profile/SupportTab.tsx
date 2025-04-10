
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LifeBuoy, MessageCircle, Clock, CheckCircle, AlertCircle, Filter, Plus } from 'lucide-react';

interface SupportTabProps {
  userId: string;
  formatDate: (dateString: string) => string;
}

// Mock data for support tickets
const SUPPORT_TICKETS = [
  {
    id: "T001",
    subject: "Problème de livraison",
    description: "Ma commande CMD-87562 n'a pas été livrée à la bonne adresse.",
    date: "2025-03-15",
    status: "resolved",
    priority: "high",
    agent: "Marie Dubois",
    lastUpdate: "2025-03-18"
  },
  {
    id: "T002",
    subject: "Question sur le paiement",
    description: "Je n'ai pas reçu la confirmation de paiement pour ma dernière vente.",
    date: "2025-03-10",
    status: "open",
    priority: "medium",
    agent: "Non assigné",
    lastUpdate: "2025-03-10"
  },
  {
    id: "T003",
    subject: "Remboursement partiel",
    description: "J'ai effectué un remboursement partiel mais le client n'a pas reçu l'argent.",
    date: "2025-02-28",
    status: "in_progress",
    priority: "high",
    agent: "Thomas Martin",
    lastUpdate: "2025-03-05"
  }
];

const SupportTab: React.FC<SupportTabProps> = ({ userId, formatDate }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Tickets de support</CardTitle>
              <CardDescription>Demandes d'assistance de l'utilisateur</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtrer
              </Button>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Nouveau ticket
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {SUPPORT_TICKETS.map((ticket) => (
              <div key={ticket.id} className="border rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <LifeBuoy className="h-5 w-5 text-gray-500" />
                    <h3 className="font-medium">{ticket.subject}</h3>
                    {ticket.status === 'open' && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Ouvert</Badge>
                    )}
                    {ticket.status === 'in_progress' && (
                      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">En cours</Badge>
                    )}
                    {ticket.status === 'resolved' && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Résolu</Badge>
                    )}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    Créé le {formatDate(ticket.date)}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center text-xs text-gray-500 mb-3 gap-2 sm:gap-4">
                  <div>
                    Priorité: <span className={`font-medium ${
                      ticket.priority === 'high' ? 'text-red-600' : 
                      ticket.priority === 'medium' ? 'text-orange-600' : 'text-blue-600'
                    }`}>
                      {ticket.priority === 'high' ? 'Haute' : 
                       ticket.priority === 'medium' ? 'Moyenne' : 'Basse'}
                    </span>
                  </div>
                  <div>Agent: <span className="font-medium">{ticket.agent}</span></div>
                  <div>Dernière mise à jour: <span className="font-medium">{formatDate(ticket.lastUpdate)}</span></div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="gap-1 text-xs">
                    <MessageCircle className="h-3 w-3" />
                    Répondre
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    Escalader
                  </Button>
                  {ticket.status !== 'resolved' && (
                    <Button variant="outline" size="sm" className="gap-1 text-xs">
                      <CheckCircle className="h-3 w-3" />
                      Marquer comme résolu
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Envoyer un message de support</CardTitle>
          <CardDescription>Contacter l'utilisateur directement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Sujet</label>
              <Input placeholder="Entrez le sujet du message" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea 
                placeholder="Écrivez votre message ici..."
                className="min-h-[150px]"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="send-copy"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="send-copy" className="text-sm text-gray-700">
                Envoyer une copie à mon email
              </label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Annuler</Button>
          <Button>Envoyer le message</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SupportTab;
