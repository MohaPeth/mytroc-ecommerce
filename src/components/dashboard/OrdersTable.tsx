
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  Package, 
  MessageSquare,
  ChevronDown 
} from 'lucide-react';
import { formatDistance } from 'date-fns';
import { fr } from 'date-fns/locale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: Date;
  total: number;
  items: number;
}

interface OrdersTableProps {
  orders: Order[];
  onViewDetails: (id: string) => void;
  onUpdateStatus?: (orderId: string, newStatus: Order['status'], comment: string) => void;
}

type StatusUpdateForm = {
  status: Order['status'];
  comment: string;
};

const OrdersTable: React.FC<OrdersTableProps> = ({ 
  orders, 
  onViewDetails,
  onUpdateStatus 
}) => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  
  const form = useForm<StatusUpdateForm>({
    defaultValues: {
      status: selectedOrder?.status || 'pending',
      comment: '',
    },
  });

  const openStatusDialog = (order: Order) => {
    setSelectedOrder(order);
    form.reset({
      status: order.status,
      comment: '',
    });
    setStatusDialogOpen(true);
  };

  const handleSubmitStatus = (data: StatusUpdateForm) => {
    if (selectedOrder && onUpdateStatus) {
      onUpdateStatus(selectedOrder.id, data.status, data.comment);
      setStatusDialogOpen(false);
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-amber-600 border-amber-600">En attente</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">En cours</Badge>;
      case 'shipped':
        return <Badge className="bg-purple-500">Expédié</Badge>;
      case 'delivered':
        return <Badge className="bg-green-500">Livré</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Annulé</Badge>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Commande</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Produits</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.customer.name}</div>
                    <div className="text-xs text-muted-foreground">{order.customer.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {formatDistance(order.date, new Date(), { 
                      addSuffix: true,
                      locale: fr 
                    })}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>{order.items} article{order.items > 1 ? 's' : ''}</TableCell>
                <TableCell>€{order.total.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => onViewDetails(order.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    {onUpdateStatus && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1">
                            Gérer <ChevronDown className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openStatusDialog(order)}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Mettre à jour le statut
                          </DropdownMenuItem>
                          {order.status === 'processing' && (
                            <DropdownMenuItem onClick={() => onUpdateStatus(order.id, 'shipped', 'Commande expédiée automatiquement')}>
                              <Package className="mr-2 h-4 w-4" />
                              Expédier rapidement
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mettre à jour le statut de la commande</DialogTitle>
            <DialogDescription>
              {selectedOrder && `Commande #${selectedOrder.id} - ${selectedOrder.customer.name}`}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitStatus)} className="space-y-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nouveau statut</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un statut" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">En attente</SelectItem>
                        <SelectItem value="processing">En cours</SelectItem>
                        <SelectItem value="shipped">Expédié</SelectItem>
                        <SelectItem value="delivered">Livré</SelectItem>
                        <SelectItem value="cancelled">Annulé</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commentaire</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Raison du changement de statut..." 
                        className="resize-none" 
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setStatusDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit">
                  Mettre à jour
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrdersTable;
