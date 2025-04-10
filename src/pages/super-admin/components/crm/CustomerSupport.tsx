
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  LifeBuoy, Filter, MessageCircle, Clock, CheckCircle, AlertCircle, Download, Plus
} from 'lucide-react';
import SupportForm from './forms/SupportForm';

// Mock data for support tickets
const SUPPORT_TICKETS = [
  {
    id: "T001",
    subject: "Problème de livraison",
    description: "Ma commande CMD-87562 n'a pas été livrée à la bonne adresse.",
    date: "15/03/2025",
    customer: "Jean Dupont",
    email: "jean.dupont@example.com",
    status: "resolved",
    priority: "high",
    agent: "Marie Dubois",
    lastUpdate: "18/03/2025"
  },
  {
    id: "T002",
    subject: "Question sur le paiement",
    description: "Je n'ai pas reçu la confirmation de paiement pour ma dernière vente.",
    date: "10/03/2025",
    customer: "Marie Laurent",
    email: "marie.laurent@example.com",
    status: "open",
    priority: "medium",
    agent: "",
    lastUpdate: "10/03/2025"
  },
  {
    id: "T003",
    subject: "Remboursement partiel",
    description: "J'ai effectué un remboursement partiel mais le client n'a pas reçu l'argent.",
    date: "28/02/2025",
    customer: "Pierre Michel",
    email: "pierre.michel@example.com",
    status: "in_progress",
    priority: "high",
    agent: "Thomas Martin",
    lastUpdate: "05/03/2025"
  },
  {
    id: "T004",
    subject: "Produit défectueux",
    description: "J'ai reçu un produit qui ne fonctionne pas correctement.",
    date: "25/02/2025",
    customer: "Sophie Girard",
    email: "sophie.girard@example.com",
    status: "open",
    priority: "medium",
    agent: "",
    lastUpdate: "25/02/2025"
  },
  {
    id: "T005",
    subject: "Problème lors de la création du compte",
    description: "Je n'arrive pas à finaliser la création de mon compte vendeur.",
    date: "20/02/2025",
    customer: "Lucas Bernard",
    email: "lucas.bernard@example.com",
    status: "resolved",
    priority: "low",
    agent: "Sophie Bernard",
    lastUpdate: "22/02/2025"
  }
];

const CustomerSupport = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const handleFormSubmit = (data: any) => {
    if (editingTicket) {
      // Logique de mise à jour
      toast.success(`Ticket "${data.subject}" mis à jour avec succès`);
    } else {
      // Logique d'ajout
      toast.success(`Ticket "${data.subject}" créé avec succès`);
    }
    setIsFormOpen(false);
    setEditingTicket(null);
  };

  const handleEditTicket = (ticket: any) => {
    setEditingTicket(ticket);
    setIsFormOpen(true);
  };

  const openNewTicketForm = () => {
    setEditingTicket(null);
    setIsFormOpen(true);
  };

  const filteredTickets = filterStatus 
    ? SUPPORT_TICKETS.filter(ticket => ticket.status === filterStatus)
    : SUPPORT_TICKETS;

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open': return 'Ouvert';
      case 'in_progress': return 'En cours';
      case 'resolved': return 'Résolu';
      case 'closed': return 'Fermé';
      default: return status;
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'low': return 'Basse';
      case 'medium': return 'Moyenne';
      case 'high': return 'Haute';
      default: return priority;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Gestion du support client</CardTitle>
              <CardDescription>
                Suivez et traitez les demandes d'assistance des utilisateurs
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={filterStatus === null ? "secondary" : "outline"} 
                size="sm" 
                className="gap-2"
                onClick={() => setFilterStatus(null)}
              >
                Tous
              </Button>
              <Button 
                variant={filterStatus === "open" ? "secondary" : "outline"} 
                size="sm" 
                className="gap-2"
                onClick={() => setFilterStatus('open')}
              >
                <AlertCircle className="h-4 w-4" />
                Ouverts
              </Button>
              <Button 
                variant={filterStatus === "in_progress" ? "secondary" : "outline"} 
                size="sm" 
                className="gap-2"
                onClick={() => setFilterStatus('in_progress')}
              >
                <Clock className="h-4 w-4" />
                En cours
              </Button>
              <Button 
                variant={filterStatus === "resolved" ? "secondary" : "outline"} 
                size="sm" 
                className="gap-2"
                onClick={() => setFilterStatus('resolved')}
              >
                <CheckCircle className="h-4 w-4" />
                Résolus
              </Button>
              <Button 
                size="sm" 
                className="gap-2"
                onClick={openNewTicketForm}
              >
                <Plus className="h-4 w-4" />
                Nouveau ticket
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  Tickets ouverts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">
                  {SUPPORT_TICKETS.filter(t => t.status === 'open').length}
                </div>
                <div className="text-xs text-gray-500">En attente de traitement</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500" />
                  En cours
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">
                  {SUPPORT_TICKETS.filter(t => t.status === 'in_progress').length}
                </div>
                <div className="text-xs text-gray-500">En cours de traitement</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Résolus
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">
                  {SUPPORT_TICKETS.filter(t => t.status === 'resolved').length}
                </div>
                <div className="text-xs text-gray-500">Derniers 30 jours</div>
              </CardContent>
            </Card>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Sujet</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <div className="font-medium">{ticket.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium truncate max-w-[200px]">{ticket.subject}</div>
                  </TableCell>
                  <TableCell>{ticket.customer}</TableCell>
                  <TableCell>{ticket.date}</TableCell>
                  <TableCell>
                    {ticket.priority === 'high' && (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        Haute
                      </Badge>
                    )}
                    {ticket.priority === 'medium' && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Moyenne
                      </Badge>
                    )}
                    {ticket.priority === 'low' && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Basse
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {ticket.status === 'open' && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        Ouvert
                      </Badge>
                    )}
                    {ticket.status === 'in_progress' && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        En cours
                      </Badge>
                    )}
                    {ticket.status === 'resolved' && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Résolu
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {ticket.agent || "Non assigné"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEditTicket(ticket)}>
                      Détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {editingTicket ? 'Modifier le ticket de support' : 'Créer un nouveau ticket de support'}
            </DialogTitle>
          </DialogHeader>
          <SupportForm 
            onSubmit={handleFormSubmit} 
            onCancel={() => setIsFormOpen(false)}
            initialData={editingTicket && {
              subject: editingTicket.subject,
              description: editingTicket.description,
              priority: editingTicket.priority,
              status: editingTicket.status,
              agent: editingTicket.agent ? "1" : "", // Simplifié pour l'exemple
              customerEmail: editingTicket.email,
              orderNumber: ""
            }}
            title={editingTicket ? 'Modifier le ticket de support' : 'Créer un ticket de support'}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerSupport;
