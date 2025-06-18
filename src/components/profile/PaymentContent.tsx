
import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Edit, 
  Trash, 
  Percent,
  ChevronRight,
  Smartphone,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePaymentMethods } from '@/hooks/usePaymentMethods';
import { usePromoCodes } from '@/hooks/usePromoCodes';
import AddPaymentMethodModal from './modals/AddPaymentMethodModal';
import AddPromoCodeModal from './modals/AddPromoCodeModal';

const PaymentContent = () => {
  const { paymentMethods, deletePaymentMethod, updatePaymentMethod, loading: paymentLoading } = usePaymentMethods();
  const { promoCodes, loading: promoLoading } = usePromoCodes();
  const [addPaymentModalOpen, setAddPaymentModalOpen] = useState(false);
  const [addPromoModalOpen, setAddPromoModalOpen] = useState(false);

  const getPaymentIcon = (type: string) => {
    switch (type) {
      case 'card':
        return <CreditCard className="h-6 w-6 text-gray-700" />;
      case 'mobile_money':
        return <Smartphone className="h-6 w-6 text-orange-500" />;
      case 'cash_on_delivery':
        return <DollarSign className="h-6 w-6 text-gray-700" />;
      default:
        return <CreditCard className="h-6 w-6 text-gray-700" />;
    }
  };

  const getPaymentBgColor = (type: string) => {
    switch (type) {
      case 'card':
        return 'bg-gray-100';
      case 'mobile_money':
        return 'bg-orange-100';
      case 'cash_on_delivery':
        return 'bg-gray-100';
      default:
        return 'bg-gray-100';
    }
  };

  const handleDeletePaymentMethod = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette méthode de paiement ?')) {
      await deletePaymentMethod(id);
    }
  };

  const handleSetAsDefault = async (id: string) => {
    await updatePaymentMethod(id, { is_default: true });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Méthodes de paiement</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={() => setAddPaymentModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              <span>Ajouter</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {paymentLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mytroc-primary"></div>
            </div>
          ) : paymentMethods.length > 0 ? (
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between border rounded-md p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`${getPaymentBgColor(method.type)} p-2 rounded`}>
                      {getPaymentIcon(method.type)}
                    </div>
                    <div>
                      <p className="font-medium">{method.name}</p>
                      {method.type === 'card' && method.details.expiryDate && (
                        <p className="text-sm text-gray-500">Expire le {method.details.expiryDate}</p>
                      )}
                      {method.type === 'mobile_money' && method.details.phoneNumber && (
                        <p className="text-sm text-gray-500">{method.details.phoneNumber}</p>
                      )}
                      {method.type === 'cash_on_delivery' && (
                        <p className="text-sm text-gray-500">Payer lors de la réception</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {method.is_default ? (
                      <Badge>Par défaut</Badge>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSetAsDefault(method.id)}
                      >
                        Définir par défaut
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeletePaymentMethod(method.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Aucune méthode de paiement configurée</p>
              <Button onClick={() => setAddPaymentModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une méthode de paiement
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Codes promo et réductions</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={() => setAddPromoModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
              <span>Ajouter</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {promoLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mytroc-primary"></div>
            </div>
          ) : promoCodes.length > 0 ? (
            <div className="space-y-4">
              {promoCodes.map((promo) => (
                <div key={promo.id} className="flex justify-between items-center p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-mytroc-secondary/10 rounded-md">
                      <Percent className="h-5 w-5 text-mytroc-secondary" />
                    </div>
                    <div>
                      <p className="font-medium">{promo.code}</p>
                      <p className="text-sm text-gray-600">
                        {promo.description || 
                          (promo.discount_percent 
                            ? `${promo.discount_percent}% de réduction`
                            : promo.discount_amount 
                            ? `${promo.discount_amount}€ de réduction`
                            : 'Code promo'
                          )
                        }
                      </p>
                      {promo.expires_at && (
                        <p className="text-xs text-gray-500">
                          Expire le {new Date(promo.expires_at).toLocaleDateString('fr-FR')}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={promo.is_active && (!promo.expires_at || new Date(promo.expires_at) > new Date())
                      ? "bg-mytroc-secondary/10 text-mytroc-secondary border-mytroc-secondary/20"
                      : "bg-gray-100 text-gray-500"
                    }
                  >
                    {promo.is_active && (!promo.expires_at || new Date(promo.expires_at) > new Date()) ? 'Actif' : 'Expiré'}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Aucun code promo disponible</p>
              <Button onClick={() => setAddPromoModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un code promo
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <AddPaymentMethodModal 
        open={addPaymentModalOpen}
        onOpenChange={setAddPaymentModalOpen}
      />

      <AddPromoCodeModal 
        open={addPromoModalOpen}
        onOpenChange={setAddPromoModalOpen}
      />
    </div>
  );
};

export default PaymentContent;
