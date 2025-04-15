
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Plus, 
  PenSquare, 
  Trash2, 
  PlayCircle, 
  PauseCircle, 
  PackageOpen, 
  CalendarClock,
  ShoppingCart,
  Mail,
  Bell,
  Users
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import WorkflowForm from './forms/WorkflowForm';
import { toast } from 'sonner';

// Données d'exemple pour les workflows
const INITIAL_WORKFLOWS = [
  {
    id: 1,
    name: "Rappel de panier abandonné",
    description: "Envoie un email de rappel 24h après un panier abandonné",
    trigger: "cart_abandonment",
    actions: ["send_email"],
    condition: "cart_value > 50",
    status: "active",
    lastRun: "2025-04-12",
    executions: 128
  },
  {
    id: 2,
    name: "Alerte stock faible",
    description: "Notifie le vendeur quand le stock d'un produit est bas",
    trigger: "low_stock",
    actions: ["send_notification"],
    condition: "stock < 5",
    status: "active",
    lastRun: "2025-04-14",
    executions: 43
  },
  {
    id: 3,
    name: "Email de bienvenue",
    description: "Envoie un email de bienvenue après l'inscription",
    trigger: "user_registration",
    actions: ["send_email"],
    condition: "all",
    status: "active",
    lastRun: "2025-04-15",
    executions: 217
  },
  {
    id: 4,
    name: "Rappel d'expédition",
    description: "Rappelle au vendeur d'expédier une commande après 48h",
    trigger: "order_confirmed",
    actions: ["send_notification"],
    condition: "shipping_status = 'pending'",
    status: "paused",
    lastRun: "2025-04-10",
    executions: 56
  }
];

const AutomationWorkflows = () => {
  const [workflows, setWorkflows] = useState(INITIAL_WORKFLOWS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<typeof INITIAL_WORKFLOWS[0] | null>(null);

  const handleStatusChange = (id: number, newStatus: string) => {
    setWorkflows(workflows.map(workflow => 
      workflow.id === id ? { ...workflow, status: newStatus } : workflow
    ));
    
    toast.success(`Le statut du workflow a été mis à jour`);
  };

  const handleFormSubmit = (data: any) => {
    if (editingWorkflow) {
      // Mise à jour d'un workflow existant
      setWorkflows(workflows.map(workflow => 
        workflow.id === editingWorkflow.id ? { ...workflow, ...data } : workflow
      ));
      toast.success(`Le workflow "${data.name}" a été mis à jour`);
    } else {
      // Création d'un nouveau workflow
      const newWorkflow = {
        id: Math.max(0, ...workflows.map(w => w.id)) + 1,
        ...data,
        status: "active",
        lastRun: "-",
        executions: 0
      };
      setWorkflows([...workflows, newWorkflow]);
      toast.success(`Le workflow "${data.name}" a été créé`);
    }
    
    setIsFormOpen(false);
    setEditingWorkflow(null);
  };

  const handleEditWorkflow = (workflow: typeof INITIAL_WORKFLOWS[0]) => {
    setEditingWorkflow(workflow);
    setIsFormOpen(true);
  };

  const handleDeleteWorkflow = (id: number) => {
    const workflowToDelete = workflows.find(w => w.id === id);
    setWorkflows(workflows.filter(workflow => workflow.id !== id));
    toast.success(`Le workflow "${workflowToDelete?.name}" a été supprimé`);
  };

  const openNewWorkflowForm = () => {
    setEditingWorkflow(null);
    setIsFormOpen(true);
  };

  const getTriggerIcon = (trigger: string) => {
    switch (trigger) {
      case 'cart_abandonment':
        return <ShoppingCart className="h-4 w-4" />;
      case 'low_stock':
        return <PackageOpen className="h-4 w-4" />;
      case 'user_registration':
        return <Users className="h-4 w-4" />;
      case 'order_confirmed':
        return <CalendarClock className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'send_email':
        return <Mail className="h-4 w-4" />;
      case 'send_notification':
        return <Bell className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle>Workflows automatisés</CardTitle>
          <CardDescription>
            Automatisez les tâches répétitives et les interactions avec les utilisateurs
          </CardDescription>
        </div>
        <Button onClick={openNewWorkflowForm} className="gap-2">
          <Plus className="h-4 w-4" />
          Nouveau workflow
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Déclencheur</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Dernière exécution</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workflows.map((workflow) => (
              <TableRow key={workflow.id}>
                <TableCell className="font-medium">
                  {workflow.name}
                  <div className="text-xs text-muted-foreground mt-1">{workflow.description}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getTriggerIcon(workflow.trigger)}
                    <span>
                      {workflow.trigger === 'cart_abandonment' && 'Panier abandonné'}
                      {workflow.trigger === 'low_stock' && 'Stock faible'}
                      {workflow.trigger === 'user_registration' && 'Inscription'}
                      {workflow.trigger === 'order_confirmed' && 'Commande confirmée'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {workflow.actions.map((action, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {getActionIcon(action)}
                        <span>
                          {action === 'send_email' && 'Email'}
                          {action === 'send_notification' && 'Notification'}
                        </span>
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-gray-100 p-1 rounded">
                    {workflow.condition}
                  </code>
                </TableCell>
                <TableCell>{workflow.lastRun}</TableCell>
                <TableCell>{workflow.executions}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={workflow.status === 'active'} 
                      onCheckedChange={(checked) => 
                        handleStatusChange(workflow.id, checked ? 'active' : 'paused')
                      }
                    />
                    <span className={workflow.status === 'active' ? 'text-green-600' : 'text-gray-500'}>
                      {workflow.status === 'active' ? 'Actif' : 'Pause'}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditWorkflow(workflow)}
                    >
                      <PenSquare className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteWorkflow(workflow.id)}
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
          Total : {workflows.length} workflows, {workflows.filter(w => w.status === 'active').length} actifs
        </div>
      </CardFooter>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingWorkflow ? 'Modifier le workflow' : 'Créer un nouveau workflow'}
            </DialogTitle>
            <DialogDescription>
              {editingWorkflow 
                ? 'Modifiez les paramètres du workflow existant' 
                : 'Définissez les paramètres du nouveau workflow automatisé'}
            </DialogDescription>
          </DialogHeader>
          <WorkflowForm
            onSubmit={handleFormSubmit}
            initialData={editingWorkflow}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AutomationWorkflows;
