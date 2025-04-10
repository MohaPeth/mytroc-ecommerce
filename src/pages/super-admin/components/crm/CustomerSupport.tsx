
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  LifeBuoy, Filter, MessageSquare, Download, Settings, FileQuestion, Users,
  User, Clock, CheckCircle, AlertCircle, XCircle
} from 'lucide-react';

// Mock data for support tickets
const SUPPORT_TICKETS = [
  {
    id: "T001",
    customer: "Jean Dupont",
    subject: "Problème de livraison",
    category: "shipping",
    createdAt: "15/03/2025",
    lastUpdate: "18/03/2025",
    status: "resolved",
    priority: "high",
    agent: "Marie Dubois"
  },
  {
    id: "T002",
    customer: "Marie Laurent",
    subject: "Question sur le paiement",
    category: "payment",
    createdAt: "10/03/2025",
    lastUpdate: "10/03/2025",
    status: "open",
    priority: "medium",
    agent: null
  },
  {
    id: "T003",
    customer: "Pierre Michel",
    subject: "Remboursement partiel",
    category: "refund",
    createdAt: "28/02/2025",
    lastUpdate: "05/03/2025",
    status: "in_progress",
    priority: "high",
    agent: "Thomas Martin"
  },
  {
    id: "T004",
    customer: "Sophie Girard",
    subject: "Article manquant",
    category: "shipping",
    createdAt: "25/02/2025",
    lastUpdate: "28/02/2025",
    status: "resolved",
    priority: "medium",
    agent: "Marie Dubois"
  },
  {
    id: "T005",
    customer: "Lucas Bernard",
    subject: "Produit endommagé",
    category: "product",
    createdAt: "20/02/2025",
    lastUpdate: "22/02/2025",
    status: "resolved",
    priority: "high",
    agent: "Thomas Martin"
  }
];

const CustomerSupport = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Service client</CardTitle>
              <CardDescription>
                Gérez les demandes de support et d'assistance des utilisateurs
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtrer
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <FileQuestion className="h-4 w-4" />
                FAQ
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Users className="h-4 w-4" />
                Agents
              </Button>
              <Button size="sm" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Nouveau ticket
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  Tickets ouverts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">24</div>
                <div className="text-xs text-gray-500">3 tickets prioritaires</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  Temps de réponse
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">3h 12m</div>
                <div className="text-xs text-gray-500">Temps moyen de première réponse</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Tickets résolus
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">156</div>
                <div className="text-xs text-gray-500">Ce mois-ci</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-sm flex items-center gap-2">
                  <User className="h-4 w-4 text-purple-500" />
                  Satisfaction client
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">92%</div>
                <div className="text-xs text-gray-500">Basé sur 124 évaluations</div>
              </CardContent>
            </Card>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Sujet</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Date création</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SUPPORT_TICKETS.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                    <div className="font-medium">{ticket.id}</div>
                  </TableCell>
                  <TableCell>{ticket.customer}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>{ticket.category}</TableCell>
                  <TableCell>{ticket.createdAt}</TableCell>
                  <TableCell>
                    {ticket.status === 'open' && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Ouvert</Badge>
                    )}
                    {ticket.status === 'in_progress' && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">En cours</Badge>
                    )}
                    {ticket.status === 'resolved' && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Résolu</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {ticket.priority === 'high' && (
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Haute</Badge>
                    )}
                    {ticket.priority === 'medium' && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Moyenne</Badge>
                    )}
                    {ticket.priority === 'low' && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Basse</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {ticket.agent || 'Non assigné'}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Voir</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerSupport;
