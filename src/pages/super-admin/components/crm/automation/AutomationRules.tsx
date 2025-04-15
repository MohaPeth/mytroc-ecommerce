
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Bell, 
  Plus, 
  PenSquare, 
  Trash2, 
  CheckCircle2,
  XCircle,
  Clock,
  PackageOpen,
  UserMinus,
  ShoppingBag
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import RuleForm from './forms/RuleForm';
import { toast } from 'sonner';

// Données d'exemple pour les règles et alertes
const INITIAL_RULES = [
  {
    id: 1,
    name: "Alerte stock critique",
    description: "Notifie quand un produit a moins de 3 articles en stock",
    condition: "stock < 3",
    target: "admin,vendor",
    action: "send_notification",
    message: "Stock critique pour le produit {product_name}. Il ne reste que {stock} unité(s).",
    status: "active",
    priority: "high",
    createdAt: "2025-03-20",
    triggeredCount: 47
  },
  {
    id: 2,
    name: "Commande non expédiée",
    description: "Alerte après 48h si une commande payée n'a pas été expédiée",
    condition: "status = 'paid' AND shipping_status = 'pending' AND TIMESTAMPDIFF(HOUR, order_date, NOW()) >= 48",
    target: "admin,vendor",
    action: "send_notification",
    message: "La commande #{order_id} n'a pas été expédiée depuis 48h.",
    status: "active",
    priority: "medium",
    createdAt: "2025-03-25",
    triggeredCount: 12
  },
  {
    id: 3,
    name: "Utilisateur inactif 30 jours",
    description: "Détecte les utilisateurs inactifs depuis 30 jours",
    condition: "TIMESTAMPDIFF(DAY, last_login, NOW()) >= 30",
    target: "system",
    action: "tag_user",
    message: "inactive_30days",
    status: "active",
    priority: "low",
    createdAt: "2025-04-01",
    triggeredCount: 328
  },
  {
    id: 4,
    name: "Alerte commande importante",
    description: "Signale une commande de plus de 500€",
    condition: "total_amount > 500",
    target: "admin",
    action: "send_notification",
    message: "Commande importante de {total_amount}€ passée par {customer_name}.",
    status: "paused",
    priority: "medium",
    createdAt: "2025-04-10",
    triggeredCount: 8
  }
];

const AutomationRules = () => {
  const [rules, setRules] = useState(INITIAL_RULES);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<typeof INITIAL_RULES[0] | null>(null);

  const handleStatusChange = (id: number, newStatus: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, status: newStatus } : rule
    ));
    
    toast.success(`Le statut de la règle a été mis à jour`);
  };

  const handleFormSubmit = (data: any) => {
    if (editingRule) {
      // Mise à jour d'une règle existante
      setRules(rules.map(rule => 
        rule.id === editingRule.id ? { ...rule, ...data } : rule
      ));
      toast.success(`La règle "${data.name}" a été mise à jour`);
    } else {
      // Création d'une nouvelle règle
      const newRule = {
        id: Math.max(0, ...rules.map(r => r.id)) + 1,
        ...data,
        status: "active",
        createdAt: new Date().toISOString().split('T')[0],
        triggeredCount: 0
      };
      setRules([...rules, newRule]);
      toast.success(`La règle "${data.name}" a été créée`);
    }
    
    setIsFormOpen(false);
    setEditingRule(null);
  };

  const handleEditRule = (rule: typeof INITIAL_RULES[0]) => {
    setEditingRule(rule);
    setIsFormOpen(true);
  };

  const handleDeleteRule = (id: number) => {
    const ruleToDelete = rules.find(r => r.id === id);
    setRules(rules.filter(rule => rule.id !== id));
    toast.success(`La règle "${ruleToDelete?.name}" a été supprimée`);
  };

  const openNewRuleForm = () => {
    setEditingRule(null);
    setIsFormOpen(true);
  };

  const getTypeIcon = (name: string, condition: string) => {
    if (name.toLowerCase().includes('stock') || condition.includes('stock')) {
      return <PackageOpen className="h-4 w-4 text-amber-500" />;
    } else if (name.toLowerCase().includes('commande') || condition.includes('order')) {
      return <ShoppingBag className="h-4 w-4 text-blue-500" />;
    } else if (name.toLowerCase().includes('inactif') || condition.includes('inactive')) {
      return <UserMinus className="h-4 w-4 text-red-500" />;
    } else {
      return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">Haute</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Moyenne</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Basse</Badge>;
      default:
        return <Badge variant="outline">Normale</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle>Règles & Alertes</CardTitle>
          <CardDescription>
            Configurez des alertes automatiques basées sur des conditions spécifiques
          </CardDescription>
        </div>
        <Button onClick={openNewRuleForm} className="gap-2">
          <Plus className="h-4 w-4" />
          Nouvelle règle
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Cible</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Priorité</TableHead>
              <TableHead>Déclenchements</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(rule.name, rule.condition)}
                    {rule.name}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{rule.description}</div>
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-gray-100 p-1 rounded">
                    {rule.condition.length > 40 
                      ? `${rule.condition.substring(0, 40)}...` 
                      : rule.condition
                    }
                  </code>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {rule.target.split(',').map((target, index) => (
                      <Badge key={index} variant="outline">
                        {target === 'admin' ? 'Admin' : target === 'vendor' ? 'Vendeur' : 'Système'}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {rule.action === 'send_notification' ? (
                      <>
                        <Bell className="h-4 w-4" />
                        <span className="text-sm">Notification</span>
                      </>
                    ) : rule.action === 'tag_user' ? (
                      <>
                        <Bell className="h-4 w-4" />
                        <span className="text-sm">Tag utilisateur</span>
                      </>
                    ) : (
                      <>
                        <Bell className="h-4 w-4" />
                        <span className="text-sm">Action</span>
                      </>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {getPriorityBadge(rule.priority)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{rule.triggeredCount}</span>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={rule.status === 'active'} 
                      onCheckedChange={(checked) => 
                        handleStatusChange(rule.id, checked ? 'active' : 'paused')
                      }
                    />
                    <span className={rule.status === 'active' ? 'text-green-600' : 'text-gray-500'}>
                      {rule.status === 'active' ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        <XCircle className="h-4 w-4" />
                      )}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditRule(rule)}
                    >
                      <PenSquare className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteRule(rule.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Total : {rules.length} règles, {rules.filter(r => r.status === 'active').length} actives
        </div>
      </CardFooter>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingRule ? 'Modifier la règle' : 'Créer une nouvelle règle'}
            </DialogTitle>
            <DialogDescription>
              {editingRule 
                ? 'Modifiez les paramètres de la règle existante' 
                : 'Définissez les conditions et actions pour cette règle d\'alerte'}
            </DialogDescription>
          </DialogHeader>
          <RuleForm 
            onSubmit={handleFormSubmit}
            initialData={editingRule}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AutomationRules;
