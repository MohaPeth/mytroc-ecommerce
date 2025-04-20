
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PaymentMethod = 'card' | 'orange' | 'airtel' | 'cod';
type DeliveryMethod = 'relay' | 'home';

type PaymentInfo = {
  mobileNumber?: string;
  transactionId?: string;
};

type DeliveryInfo = {
  method: DeliveryMethod;
  relayPointName?: string;
  relayPointId?: number;
  address?: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    region: string;
  };
};

type PaymentState = {
  paymentMethod: PaymentMethod;
  paymentInfo: PaymentInfo;
  deliveryInfo: DeliveryInfo;
  
  // Actions
  setPaymentMethod: (method: PaymentMethod) => void;
  setPaymentInfo: (info: PaymentInfo) => void;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  setRelayPoint: (id: number, name: string) => void;
  setDeliveryAddress: (address: DeliveryInfo['address']) => void;
  reset: () => void;
};

export const usePaymentState = create<PaymentState>()(
  persist(
    (set) => ({
      paymentMethod: 'card',
      paymentInfo: {},
      deliveryInfo: {
        method: 'relay',
      },
      
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      
      setPaymentInfo: (info) => set((state) => ({
        paymentInfo: { ...state.paymentInfo, ...info }
      })),
      
      setDeliveryMethod: (method) => set((state) => ({
        deliveryInfo: { ...state.deliveryInfo, method }
      })),
      
      setRelayPoint: (id, name) => set((state) => ({
        deliveryInfo: { 
          ...state.deliveryInfo, 
          relayPointId: id, 
          relayPointName: name 
        }
      })),
      
      setDeliveryAddress: (address) => set((state) => ({
        deliveryInfo: { ...state.deliveryInfo, address }
      })),
      
      reset: () => set({
        paymentMethod: 'card',
        paymentInfo: {},
        deliveryInfo: {
          method: 'relay',
        },
      }),
    }),
    {
      name: 'payment-state-storage',
    }
  )
);
